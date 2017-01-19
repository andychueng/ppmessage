# -*- coding: utf-8 -*-
#
# Copyright (C) 2010-2016 PPMessage.
# Guijin Ding, dingguijin@gmail.com.
# All rights reserved.
#

from .getyvobjectdetailhandler import GetYVObjectDetailHandler

from .ackmessagehandler import AckMessageHandler
from .setdeviceinfohandler import SetDeviceInfoHandler

from .ppcreateanonymoushandler import PPCreateAnonymousHandler
from .ppcreateuserhandler import PPCreateUserHandler
from .ppremoveuserhandler import PPRemoveUserHandler
from .ppupdateuserhandler import PPUpdateUserHandler

from .ppcreatedevicehandler import PPCreateDeviceHandler
from .ppupdatedevicehandler import PPUpdateDeviceHandler

from .ppcreateconversationhandler import PPCreateConversationHandler
from .ppupdateconversationhandler import PPUpdateConversationHandler
from .ppgetconversationinfohandler import PPGetConversationInfoHandler

from .ppgetconversationlisthandler import PPGetConversationListHandler
from .ppgetuserconversationlisthandler import PPGetUserConversationListHandler

from .ppopenconversationhandler import PPOpenConversationHandler
from .ppcloseconversationhandler import PPCloseConversationHandler

from .ppgetappinfohandler import PPGetAppInfoHandler
from .ppgetserviceuserlisthandler import PPGetServiceUserListHandler

from .ppsendmessagehandler import PPSendMessageHandler
from .ppgetuseruuidhandler import PPGetUserUUIDHandler
from .ppgetuserinfohandler import PPGetUserInfoHandler

from .ppupdateconversationmemberhandler import PPUpdateConversationMemberHandler

from .ppupdateappinfohandler import PPUpdateAppInfoHandler
from .ppisemailvalidhandler import PPIsEmailValidHandler

from .ppgetconversationuserlisthandler import PPGetConversationUserListHandler

from .pppageuserconversationhandler import PPPageUserConversationHandler
from .pppageunackedmessagehandler import PPPageUnackedMessageHandler
from .pppagehistorymessagehandler import PPPageHistoryMessageHandler

from .ppkefuloginhandler import PPKefuLoginHandler
from .ppkefulogouthandler import PPKefuLogoutHandler

from .ppgetuserdetailhandler import PPGetUserDetailHandler

from .ppconsolelogouthandler import PPConsoleLogoutHandler

from .ppconsolegetoverviewnumber import PPConsoleGetOverviewNumber
from .ppconsolegetrealtimecustomernumber import PPConsoleGetRealTimeCustomerNumber
from .ppconsolegetrealtimeservicenumber import PPConsoleGetRealTimeServiceNumber
from .ppconsolegetrealtimemessagenumber import PPConsoleGetRealTimeMessageNumber
from .ppconsolegetservicenumberbyrange import PPConsoleGetServiceNumberByRange
from .ppconsolegetcustomernumberbyrange import PPConsoleGetCustomerNumberByRange
from .ppconsolegetmessagenumberbyrange import PPConsoleGetMessageNumberByRange

from .ppgetapiinfohandler import PPGetApiInfoHandler

from .ppvalidateonlinedevicehandler import PPValidateOnlineDeviceHandler

from .ppkefusetbusy import PPKefuSetBusy
from .ppkefusetready import PPKefuSetReady
from .ppkefusetrest import PPKefuSetRest
from .ppkefusetserviceuserstatus import PPKefuSetServiceUserStatus

from .ppcomgetdefaultconversationhandler import PPComGetDefaultConversationHandler
from .ppcomcreateconversationhandler import PPComCreateConversationHandler

from .ppgetipinfohandler import PPGetIPInfoHandler
from .ppcomtrackeventhandler import PPComTrackEventHandler

def getWebServiceHandlers():
    handler_list = []

    # ack the received message
    handler_list.append((r"/ACK_MESSAGE", AckMessageHandler))

    # get yvobject detail yvobject is the caller and callee
    handler_list.append((r"/GET_YVOBJECT_DETAIL", GetYVObjectDetailHandler))

    handler_list.append((r"/PPCOM_GET_DEFAULT_CONVERSATION", PPComGetDefaultConversationHandler))
    handler_list.append((r"/PPCOM_CREATE_CONVERSATION", PPComCreateConversationHandler))

    handler_list.append((r"/PPCONSOLE_GET_OVERVIEW_NUMBER", PPConsoleGetOverviewNumber))
    handler_list.append((r"/PPCONSOLE_GET_REAL_TIME_CUSTOMER_NUMBER", PPConsoleGetRealTimeCustomerNumber))
    handler_list.append((r"/PPCONSOLE_GET_REAL_TIME_SERVICE_NUMBER", PPConsoleGetRealTimeServiceNumber))
    handler_list.append((r"/PPCONSOLE_GET_REAL_TIME_MESSAGE_NUMBER", PPConsoleGetRealTimeMessageNumber))
    handler_list.append((r"/PPCONSOLE_GET_SERVICE_NUMBER_BY_RANGE", PPConsoleGetServiceNumberByRange))
    handler_list.append((r"/PPCONSOLE_GET_CUSTOMER_NUMBER_BY_RANGE", PPConsoleGetCustomerNumberByRange))
    handler_list.append((r"/PPCONSOLE_GET_MESSAGE_NUMBER_BY_RANGE", PPConsoleGetMessageNumberByRange))

    handler_list.append((r"/PPCONSOLE_LOGOUT", PPConsoleLogoutHandler))

    handler_list.append((r"/PPKEFU_LOGIN", PPKefuLoginHandler))
    handler_list.append((r"/PPKEFU_LOGOUT", PPKefuLogoutHandler))
    handler_list.append((r"/PPKEFU_SET_BUSY", PPKefuSetBusy))
    handler_list.append((r"/PPKEFU_SET_READY", PPKefuSetReady))
    handler_list.append((r"/PPKEFU_SET_REST", PPKefuSetRest))
    handler_list.append((r"/PPKEFU_SET_SERVICE_USER_STATUS", PPKefuSetServiceUserStatus))
    
    # set deviceinfo
    handler_list.append((r"/SET_DEVICE_INFO", SetDeviceInfoHandler))

    # PPMESSAGE
    handler_list.append((r"/PP_CREATE_ANONYMOUS", PPCreateAnonymousHandler))
    handler_list.append((r"/PP_CREATE_USER", PPCreateUserHandler))
    handler_list.append((r"/PP_REMOVE_USER", PPRemoveUserHandler))
    handler_list.append((r"/PP_UPDATE_USER", PPUpdateUserHandler))
    
    handler_list.append((r"/PP_CREATE_DEVICE", PPCreateDeviceHandler))
    handler_list.append((r"/PP_UPDATE_DEVICE", PPUpdateDeviceHandler))
        
    handler_list.append((r"/PP_CREATE_CONVERSATION", PPCreateConversationHandler))
    handler_list.append((r"/PP_UPDATE_CONVERSATION", PPUpdateConversationHandler))
    handler_list.append((r"/PP_GET_CONVERSATION_INFO", PPGetConversationInfoHandler))
    
    handler_list.append((r"/PP_GET_CONVERSATION_LIST", PPGetConversationListHandler))
    handler_list.append((r"/PP_GET_USER_CONVERSATION_LIST", PPGetUserConversationListHandler))
    
    handler_list.append((r"/PP_OPEN_CONVERSATION", PPOpenConversationHandler))
    handler_list.append((r"/PP_CLOSE_CONVERSATION", PPCloseConversationHandler))

    handler_list.append((r"/PP_GET_APP_INFO", PPGetAppInfoHandler))
    handler_list.append((r"/PP_GET_SERVICE_USER_LIST", PPGetServiceUserListHandler))

    handler_list.append((r"/PP_SEND_MESSAGE", PPSendMessageHandler))
    handler_list.append((r"/PP_GET_USER_UUID", PPGetUserUUIDHandler))
    handler_list.append((r"/PP_GET_USER_INFO", PPGetUserInfoHandler))

    handler_list.append((r"/PP_UPDATE_CONVERSATION_MEMBER", PPUpdateConversationMemberHandler))

    handler_list.append((r"/PP_UPDATE_APP_INFO", PPUpdateAppInfoHandler))
    handler_list.append((r"/PP_IS_EMAIL_VALID", PPIsEmailValidHandler))

    handler_list.append((r"/PP_GET_CONVERSATION_USER_LIST", PPGetConversationUserListHandler))
    
    handler_list.append((r"/PP_PAGE_USER_CONVERSATION", PPPageUserConversationHandler))
    handler_list.append((r"/PP_PAGE_UNACKED_MESSAGE", PPPageUnackedMessageHandler))
    handler_list.append((r"/PP_PAGE_HISTORY_MESSAGE", PPPageHistoryMessageHandler))

    handler_list.append((r"/PP_GET_USER_DETAIL", PPGetUserDetailHandler))

    handler_list.append((r"/PP_GET_API_INFO", PPGetApiInfoHandler))

    handler_list.append((r"/PP_VALIDATE_ONLINE_DEVICE", PPValidateOnlineDeviceHandler))

    handler_list.append((r"/PP_GET_IP_INFO", PPGetIPInfoHandler))
    handler_list.append((r"/PPCOM_TRACK_EVENT", PPComTrackEventHandler))
    
    return handler_list

