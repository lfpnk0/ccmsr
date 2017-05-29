import sys, tempfile, urllib2, base64, json
from ctypes import *
from ctypes import wintypes
class POINT(Structure): _fields_ = [("x", c_int),("y", c_int)]
wintypes.LPPOINT = POINTER(POINT)

def router():
    if sys.argv[1]=='help':
        resp = eval('help()')
        print resp
        return
    else:
        inB64Str = sys.argv[1]+"==="
        inJsonStr = base64.b64decode(inB64Str)
        inJsonObj = json.loads(inJsonStr)
        json_str = json.dumps(inJsonObj['params'])
        resp = eval(inJsonObj['func']+"('"+json_str+"')")
    outJsonStr = '{"req":'+inJsonStr+',"resp":'+str(resp)+'}'
    outB64Str = base64.b64encode(outJsonStr)
    print outB64Str

def help():
    s = "USAGE INFO:\n"
    s += "Arguments to this application should be in the form of a base64 encoded JSON string with the following structure:\n"
    s += "\n"
    s += '{"reqID":[request ID],"func":[function name],"params":{[paramter]:[value]}}\n'
    s += "\n"
    s += "For help on a specific function, use the following argument:\n"
    s += "\n"
    s += '{"func":[function name],"params":{"help":"help"}}\n'
    s += "\n"
    s += "FUNCTION LIST:\n"
    s += "runProg(path)\n"
    return s

#this shouldn't be necessary but is useful for testing
def runDll(dllPath, callConv, dllFun, dllParams):
    if callConv == "cdecl":
        myDLL = cdll.LoadLibrary(dllPath)
    else:
        myDLL = windll.LoadLibrary(dllPath)
    myFun = getattr(myDLL,dllFun)
    res = eval("myFun("+dllParams+")")
    return res

def downloadFile(json_str):
    params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Downloads file and saves it to the %temp% folder."
        s += "\n"
        s += "SYNTAX:\n"
        s += "downloadFile(url,filename)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "url (string): path to file you want to download.\n"
        s += "filename (string): filename you want to save file as.\n"
        s += "\n"
        s += "RETURN:"
        s += "resp (string): Full path to file."
        return s
    fileData = urllib2.urlopen(params['url'])
    filePath = tempfile.gettempdir()+'\\'+params['filename']
    with open(filePath,'wb') as output:
        output.write(fileData.read())
    return '"'+filePath+'"'

def getWindowThreadProcessId(json_str):
    if isinstance(json_str,int): params = json.loads('{"hwnd":'+str(json_str)+'}')
    else: params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Retrieves the identifier of the thread that created the specified window."
        s += "\n"
        s += "SYNTAX:\n"
        s += "getWindowThreadProcessId(hwnd)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "hwnd (integer): A handle to the window.\n"
        s += "\n"
        s += "RETURN:"
        s += "resp (integer): Thread process identifier."
        return s
    GetWindowThreadProcessId = windll.user32.GetWindowThreadProcessId
    GetWindowThreadProcessId.restype = wintypes.DWORD
    GetWindowThreadProcessId.argtypes = [
        wintypes.HWND, #hwnd
        wintypes.POINTER(wintypes.DWORD) #lpdwProcessId
    ]
    pid = wintypes.DWORD()
    x = windll.user32.GetWindowThreadProcessId(params['hwnd'], byref(pid))
    return pid.value

def getWindowTextLengthA(json_str):
    if isinstance(json_str,int): params = json.loads('{"hwnd":'+str(json_str)+'}')
    else: params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Retrieves the length, in characters, of the specified window's title bar text."
        s += "\n"
        s += "SYNTAX:\n"
        s += "getWindowTextLengthA(hwnd)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "hwnd (integer): A handle to the window.\n"
        s += "\n"
        s += "RETURN:"
        s += "resp (integer): The length, in characters, of the text."
        return s
    GetWindowTextLengthA = windll.user32.GetWindowTextLengthA
    GetWindowTextLengthA.restype = wintypes.BOOL
    GetWindowTextLengthA.argtypes = [
        wintypes.HWND, #hWnd
    ]
    textLen = GetWindowTextLengthA(params['hwnd'])
    return textLen

def getWindowTextW(json_str):
    if isinstance(json_str,int): params = json.loads('{"hwnd":'+str(json_str)+'}')
    else: params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Retrieves the specified window's title bar text."
        s += "\n"
        s += "SYNTAX:\n"
        s += "getWindowTextW(hwnd, maxCount)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "hwnd (integer): A handle to the window.\n"
        s += "maxCount (integer) [optional]: Maximum number of characters to retrieve.\n"
        s += "\n"
        s += "RETURN:"
        s += "resp (string): The title bar text."
        return s
    #wintypes.LPTSTR = POINTER(c_wchar_p)
    wintypes.LPTSTR = POINTER(c_wchar*params['maxCount'])
    GetWindowTextW = windll.user32.GetWindowTextW
    GetWindowTextW.restype = wintypes.BOOL
    GetWindowTextW.argtypes = [
        wintypes.HWND, #hWnd
        wintypes.LPTSTR, #lpString
        c_int #nMaxCount
    ]
    text = create_unicode_buffer(params['maxCount'])
    #text = create_string_buffer(params['maxCount'])
    x = GetWindowTextW(params['hwnd'],byref(text),params['maxCount'])
    return text.value

def isWindowVisible(json_str):
    if isinstance(json_str,int): params = json.loads('{"hwnd":'+str(json_str)+'}')
    else: params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Determines the visibility state of the specified window."
        s += "\n"
        s += "SYNTAX:\n"
        s += "isWindowVisible(hwnd)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "hwnd (integer): A handle to the window.\n"
        s += "\n"
        s += "RETURN:"
        s += "resp (integer): 0=False 1=True."
        return s
    IsWindowVisible = windll.user32.IsWindowVisible
    IsWindowVisible.restype = wintypes.BOOL
    IsWindowVisible.argtypes = [
        wintypes.HWND, #hWnd
    ]
    visible = IsWindowVisible(params['hwnd'])
    return visible

def enumWindows(json_str):
    params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Enumerates windows."
        s += "\n"
        s += "SYNTAX:\n"
        s += "enumWindows(visible)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "visible (integer): 0=OnlyNonVisible 1=OnlyVisible 2=AllWindows.\n"
        s += "\n"
        s += "RETURN:"
        s += "resp (JSON Array of Objects): List of windows with handle visibility pid and title text values."
        return s
    enumWinArr = []
    WNDENUMPROC = WINFUNCTYPE(wintypes.BOOL,wintypes.HWND,wintypes.LPARAM,)
    EnumWindows = windll.user32.EnumWindows
    EnumWindows.restype = wintypes.BOOL
    EnumWindows.argtypes = [
        WNDENUMPROC, #lpEnumFunc
        wintypes.LPARAM #lParam
    ]
    def callback(hwnd, lParam):
        visible = int(isWindowVisible(hwnd))
        if params['visible']==visible or params['visible']==2:
            pid = getWindowThreadProcessId(hwnd)
            textLen = getWindowTextLengthA(hwnd)+1
            if textLen>0:
                #text = create_unicode_buffer(textLen)
                #windll.user32.GetWindowTextW(hwnd, text, textLen)
                text = getWindowTextW('{"hwnd":'+str(hwnd)+',"maxCount":'+str(textLen)+'}')
            else: text=""
            enumWinJSON = '{"hwnd":'+str(hwnd)+','
            enumWinJSON += '"visible":'+str(visible)+','
            enumWinJSON += '"pid":'+str(pid)+','
            enumWinJSON += '"text":"'+text+'"}'
            enumWinArr.append(enumWinJSON)
        return True
    windll.user32.EnumWindows(WNDENUMPROC(callback), 0)
    enumWinStr = ','.join(enumWinArr)
    return '['+enumWinStr+']'

#doesn't work - gets screen (not client) coordinates relative to terminal popup
def getWindowRect(json_str):
    params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Retrieves the dimensions of the bounding rectangle of the specified window."
        s += "\n"
        s += "SYNTAX:\n"
        s += "getWindowRect(hwnd)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "hwnd (integer): A handle to the window.\n"
        s += "\n"
        s += "RETURN:"
        s += "resp (JSON Object): Dimensions of the bounding rectangle of the specified window."
        return s
    GetWindowRect = windll.user32.GetWindowRect
    GetWindowRect.restype = wintypes.RECT
    GetWindowRect.argtypes = [
        wintypes.HWND, #hWnd
    ]
    GWS = GetWindowRect(params['hwnd'])

    ScreenToClient = windll.user32.ScreenToClient
#    ScreenToClient.argtypes = [
#        wintypes.HWND, #hWnd
#        POINTER(, #hWnd
#    ]
    topleft = wintypes.POINT(GWS.left,GWS.top)
    ScreenToClient(params['hwnd'],byref(topleft))
    botright = wintypes.POINT(GWS.right,GWS.bottom)
    ScreenToClient(params['hwnd'],byref(botright))
    
    winRectStr = '{"top":'+str(topleft.y)
    winRectStr += ',"right":'+str(botright.x)
    winRectStr += ',"bottom":'+str(botright.y)
    winRectStr += ',"left":'+str(topleft.x)+'}'
    return winRectStr

def setWindowPos(json_str):
    params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Sets the dimensions and location of the specified window."
        s += "\n"
        s += "SYNTAX:\n"
        s += "setWindowPos(hwnd)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "hwnd (integer): A handle to the window.\n"
        s += "hWndInsertAfter (string)[optional]: Change Z order of window. See https://msdn.microsoft.com/en-us/library/windows/desktop/ms633545(v=vs.85).aspx \n"
        s += "top (integer): The new position of the top of the window in pixles.\n"
        s += "left (integer): The new position of the left side of the window in pixles.\n"
        s += "width (integer): The new width of the window in pixles.\n"
        s += "height (integer): The new height of the window in pixels.\n"
        s += "uFlags (integer): The window sizing and positioning flags. See https://msdn.microsoft.com/en-us/library/windows/desktop/ms633545(v=vs.85).aspx \n"
        s += "\n"
        s += "RETURN:"
        s += "No Return Value."
        return s
    SetWindowPos = windll.user32.SetWindowPos
    SetWindowPos.restype = wintypes.BOOL
    SetWindowPos.argtypes = [
        wintypes.HWND, #hwnd
        wintypes.HWND, #hwndInsertAfter
        c_int,  #x (left)
        c_int,  #y (top)
        c_int,  #cx (width)
        c_int,  #cy (height)
        c_uint, #uFlags
    ]
    #hWndInsertAfter
    #See https://msdn.microsoft.com/en-us/library/windows/desktop/ms633545(v=vs.85).aspx
    HWND_BOTTOM = 1 #Bottom of the Z order.
    HWND_NOTOPMOST = -2 #Top of the non-topmost windows in the Z order.
    HWND_TOP = 0 #Top of the Z order.
    HWND_TOPMOST = -1 #Bottom of the topmost windows in the Z order.
    #uFlags
    #See https://msdn.microsoft.com/en-us/library/windows/desktop/ms633545(v=vs.85).aspx
    SWP_ASYNCWINDOWPOS = 0x4000 #If the calling thread and the thread that owns the window are attached to different input queues, the system posts the request to the thread that owns the window. This prevents the calling thread from blocking its execution while other threads process the request.
    SWP_DEFERERASE = 0x2000 #Prevents generation of the WM_SYNCPAINT message.
    SWP_DRAWFRAME = 0x0020 #Draws a frame (defined in the window's class description) around the window.
    SWP_FRAMECHANGED = 0x0020 #Applies new frame styles set using the SetWindowLong function. Sends a WM_NCCALCSIZE message to the window, even if the window's size is not being changed. If this flag is not specified, WM_NCCALCSIZE is sent only when the window's size is being changed.
    SWP_HIDEWINDOW = 0x0080 #Hides the window.
    SWP_NOACTIVATE = 0x0010 #Does not activate the window. If this flag is not set, the window is activated and moved to the top of either the topmost or non-topmost group (depending on the setting of the hWndInsertAfter parameter).
    SWP_NOCOPYBITS = 0x0100 #Discards the entire contents of the client area. If this flag is not specified, the valid contents of the client area are saved and copied back into the client area after the window is sized or repositioned.
    SWP_NOMOVE = 0x0002 #Retains the current position (ignores X and Y parameters).
    SWP_NOOWNERZORDER = 0x0200 #Does not change the owner window's position in the Z order.
    SWP_NOREDRAW = 0x0008 #Does not redraw changes. If this flag is set, no repainting of any kind occurs. This applies to the client area, the nonclient area (including the title bar and scroll bars), and any part of the parent window uncovered as a result of the window being moved. When this flag is set, the application must explicitly invalidate or redraw any parts of the window and parent window that need redrawing.
    SWP_NOREPOSITION = 0x0200 #Same as the SWP_NOOWNERZORDER flag.
    SWP_NOSENDCHANGING = 0x0400 #Prevents the window from receiving the WM_WINDOWPOSCHANGING message.
    SWP_NOSIZE = 0x0001 #Retains the current size (ignores the cx and cy parameters).
    SWP_NOZORDER = 0x0004 #Retains the current Z order (ignores the hWndInsertAfter parameter).
    SWP_SHOWWINDOW = 0x0040 #Displays the window.
    #
    SetWindowPos(params['hwnd'], params['insertAfter'], params['left'], params['top'], params['width'], params['height'], params['uflags'])
    return 1

def getCursorPos(json_str):
    if json_str == '': json_str = '{}'
    params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Retrieves the position of the mouse cursor in pixels."
        s += "\n"
        s += "SYNTAX:\n"
        s += "getCursorPos()\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "No Parameters.\n"
        s += "\n"
        s += "RETURN:"
        s += "resp (JSON Object): XY coordinates of the mouse cursor in pixels."
        return s
    GetCursorPos = windll.user32.GetCursorPos
    GetCursorPos.restype = wintypes.POINT
    GetCursorPos.argtypes = [
        wintypes.LPPOINT #lpPoint
    ]
    res = POINT()
    x = GetCursorPos(byref(res))
    curPosStr = '{"x":'+str(res.x)+',"y":'+str(res.y)+'}'
    return curPosStr

def setCursorPos(json_str):
    params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Sets the position of the mouse cursor in pixels."
        s += "\n"
        s += "SYNTAX:\n"
        s += "setCursorPos(x,y)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "x (integer): New x-coordinate of the cursor in pixels.\n"
        s += "y (integer): New y-coordinate of the cursor in pixels.\n"
        s += "\n"
        s += "RETURN:"
        s += "No Return Value."
        return s
    SetCursorPos = windll.user32.SetCursorPos
    SetCursorPos(params['x'],params['y'])
    return 1

def getForegroundWindow(json_str):
    if json_str == '': json_str = '{}'
    params = json.loads(json_str)
    if'help' in params:
        s = "DESCRIPTION:"
        s += "Synthesizes mouse motion and button clicks."
        s += "\n"
        s += "SYNTAX:\n"
        s += "mouseEvent(flags,x,y,data,extraInfo)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "flags (string): Defines what actions the mouse should take. See: https://msdn.microsoft.com/en-us/library/windows/desktop/ms646260(v=vs.85).aspx\n"
        s += "x (integer): New x-coordinate of the cursor (absolute) or distance traveled in x-direction (relative).\n"
        s += "y (integer): New y-coordinate of the cursor (absolute) or distance traveled in y-direction (relative).\n"
        s += "data (string): Defines amount of wheel movement or which x buttons were pressed. See: https://msdn.microsoft.com/en-us/library/windows/desktop/ms646260(v=vs.85).aspx\n"
        s += "\n"
        s += "RETURN:"
        s += "No Return Value."
        return s
    GetForegroundWindow = windll.user32.GetForegroundWindow
    GetForegroundWindow.restype = wintypes.HWND
    hwnd = GetForegroundWindow()
    return hwnd
    
#doesn't work   
def mouseEvent(json_str):
    params = json.loads(json_str)
    if 'help' in params:
        s = "DESCRIPTION:"
        s += "Synthesizes mouse motion and button clicks."
        s += "\n"
        s += "SYNTAX:\n"
        s += "mouseEvent(flags,x,y,data,extraInfo)\n"
        s += "\n"
        s += "PARAMETERS:\n"
        s += "flags (string): Defines what actions the mouse should take. See: https://msdn.microsoft.com/en-us/library/windows/desktop/ms646260(v=vs.85).aspx\n"
        s += "x (integer): New x-coordinate of the cursor (absolute) or distance traveled in x-direction (relative).\n"
        s += "y (integer): New y-coordinate of the cursor (absolute) or distance traveled in y-direction (relative).\n"
        s += "data (string): Defines amount of wheel movement or which x buttons were pressed. See: https://msdn.microsoft.com/en-us/library/windows/desktop/ms646260(v=vs.85).aspx\n"
        s += "\n"
        s += "RETURN:"
        s += "No Return Value."
        return s
    #MOUSEEVENTF_ flags
    MOVE = 0x0001 # mouse move (1)
    ABSOLUTE = 0x8000 # absolute move (32768)
    LEFTDOWN = 0x0002 # left button down  (2)
    LEFTUP = 0x0004 # left button up (4)
    RIGHTDOWN = 0x0008 # right button down (8)
    RIGHTUP = 0x0010 # right button up (16)
    MIDDLEDOWN = 0x0020 # middle button down (32)
    MIDDLEUP = 0x0040 # middle button up (64)
    WHEEL = 0x0800 # wheel button rolled (2048)
    #
    MOVEABS = MOVE + ABSOLUTE
    LCLICK = LEFTDOWN + LEFTUP
    DCLICK = LEFTDOWN + LEFTUP + LEFTDOWN + LEFTUP
    RCLICK = RIGHTDOWN + RIGHTUP
    #
    MouseEvent = windll.user32.mouse_event
    MouseEvent.restype = wintypes.BOOL
    MouseEvent.argtypes = [
        wintypes.DWORD,  #dwFlags
        wintypes.DWORD,  #dx
        wintypes.DWORD,  #dy
        wintypes.DWORD,  #dwData
        c_ulong, #dwExtraInfo
    ]
    old = json.loads(getCursorPos('{}'))
    if params['x']<0: params['x']=old['x'];
    if params['y']<0: params['y']=old['y'];
    setCursorPos('{"x":'+str(params['x'])+',"y":'+str(params['y'])+'}')
    MouseEvent(params['flags'], params['x'], params['y'], params['data'], 0)
    setCursorPos('{"x":'+str(old['x'])+',"y":'+str(old['y'])+'}')
    #reactivate prev window

router()   
