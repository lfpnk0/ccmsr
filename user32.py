#DLL Wrapper
#import ctypes
from ctypes import *
from ctypes import wintypes

import subprocess

import sys
import base64
import json

def router():
    if sys.argv[1]=='help':
        help()
        return
    base64_str = sys.argv[1]+"==="
    json_str = base64.b64decode(base64_str)
    json_data = json.loads(json_str)
    params = json.dumps(json_data['params'])
    r = eval(json_data['func']+"('"+params+"')")

def help():
    print ""
    print "Arguments to this application should be in the form of a"
    print "base64 encoded JSON string with the following structure:"
    print ""
    print '{"func":[function name],"params":{[paramter]:[value]}}'
    print ""
    print "For help on a specific function, use the following argument:"
    print ""
    print '{"func":[function name],"params":{"help":"help"}}'
    print ""
    print "Function List:"
    print "runProg(path)"

def runDll(dllPath, callConv, dllFun, dllParams):
    if callConv == "cdecl":
        myDLL = cdll.LoadLibrary(dllPath)
    else:
        myDLL = windll.LoadLibrary(dllPath)
    myFun = getattr(myDLL,dllFun)
    r = eval("myFun("+dllParams+")")
    print (r)

def runProg(json_str):
    params = json.loads(json_str)
    if 'help' in params:
        print "runProg(path)"
        print "Returns PID"
        print 'JSON: {"func":"runProg","params":{"path":"C:/Windows/notepad.exe"}}'
        print "Base64: eyJmdW5jIjoicnVuUHJvZyIsInBhcmFtcyI6eyJwYXRoIjoiQzovV2luZG93cy9ub3RlcGFkLmV4ZSJ9fQ"
        print "user32.exe eyJmdW5jIjoicnVuUHJvZyIsInBhcmFtcyI6eyJwYXRoIjoiQzovV2luZG93cy9ub3RlcGFkLmV4ZSJ9fQ"
        return
    p = subprocess.Popen(params['path'])
    print p.pid

def enumWindows(json_str):
    params = json.loads(json_str)
    if 'help' in params:
        print "enumWindows(visible)"
        print "Visible = 0:false, 1:true, 2:all"
        print "Returns base64 encoded JSON array of objects"
        print 'JSON: {"func":"enumWindows","params":{"visible":2}}'
        print "Base64: eyJmdW5jIjoiZW51bVdpbmRvd3MiLCJwYXJhbXMiOnsidmlzaWJsZSI6Mn19"
        print "user32.exe eyJmdW5jIjoiZW51bVdpbmRvd3MiLCJwYXJhbXMiOnsidmlzaWJsZSI6Mn19"
        return
    enumWinArr = []
    wintypes.LPDWORD = POINTER(wintypes.DWORD) # Python 2 doesn't have LPDWORD
    cbStruct = WINFUNCTYPE(wintypes.BOOL,wintypes.HWND,wintypes.LPARAM,)
    windll.user32.GetWindowThreadProcessId.restype = wintypes.DWORD
    windll.user32.GetWindowThreadProcessId.argtypes = (wintypes.HWND,wintypes.LPDWORD)
    def callback(hwnd, lParam):
        enumWinJSON = '{"hwnd":'+str(hwnd)+','
        visible = int(windll.user32.IsWindowVisible(hwnd))
        enumWinJSON += '"visible":'+str(visible)+','
        pid = wintypes.DWORD()
        x = windll.user32.GetWindowThreadProcessId(hwnd, byref(pid))
        enumWinJSON += '"pid":'+str(pid.value)+','
        textLen = windll.user32.GetWindowTextLengthA(hwnd)+1
        if textLen>0:
            text = create_unicode_buffer(textLen)
            windll.user32.GetWindowTextW(hwnd, text, textLen)
        enumWinJSON += '"text":"'+text.value+'"}'
        if (params['visible']==1 and visible==1) or (params['visible']==0 and visible==0) or (params['visible']==2):
            enumWinArr.append(enumWinJSON)
        return True
    windll.user32.EnumWindows(cbStruct(callback), 0)
    enumWinStr = ','.join(enumWinArr)
    print base64.b64encode(enumWinStr)
       
def SetWindowPos(hwnd,x,y,cx,cy):
    pkPath = "C:/Windows/System32/user32.dll"
    pkConv = "stdcall"
    pkFun = "SetWindowPos"
    pkParams = "wintypes.HWND("+str(hwnd)+"),c_long(-1),c_long("+str(x)+"),c_long("+str(y)+"),c_long("+str(cx)+"),c_long("+str(cy)+"),wintypes.HWND(0x10)"
    runDll(pkPath,pkConv,pkFun,pkParams)

router()   
