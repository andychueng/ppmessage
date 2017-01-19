# -*- coding: utf-8 -*-
#
# Copyright (C) 2010-2016 PPMessage.
# Guijin Ding, dingguijin@gmail.com
#
#

from .basehandler import BaseHandler

from ppmessage.db.models import DeviceUser

from ppmessage.core.constant import API_LEVEL
from ppmessage.core.constant import USER_STATUS

from ppmessage.core.db.deviceuser import create_device_user

from ppmessage.core.utils.randomidenticon import random_identicon
from ppmessage.core.utils.randomidenticon import download_random_identicon

from ppmessage.api.error import API_ERR

import json
import uuid
import logging

from tornado.ioloop import IOLoop

class PPGetUserUUIDHandler(BaseHandler):
    def _new_user(self, _request):
        
        _ent_company_uuid = _request.get("ent_company_id")
        _ent_company_name = _request.get("ent_company_name")
        _ent_company_fullname = _request.get("ent_company_fullname")
        
        _user_icon = _request.get("ent_user_icon")
        _user_name = _request.get("ent_user_name")
        _ent_user_uuid = _request.get("ent_user_id")
        _ent_user_createtime = _request.get("ent_user_createtime") or time.time() * 1000

        _du_uuid = str(uuid.uuid1())

        if _user_icon:
            IOLoop.current().spawn_callback(download_random_identicon, _user_icon)

        _user = create_device_user(self.application.redis, {
            "uuid": _du_uuid,
            "user_name": _user_name,
            "user_fullname": _user_name,
            "user_icon": _user_icon,
            "ent_user_uuid": str(_ent_user_uuid),
            "ent_user_createtime": datetime.datetime.utcfromtimestamp(_ent_user_createtime/1000),
            "is_anonymous_user": False,
            "is_service_user": False,
            "is_owner_user": False
        })

        _r = self.getReturnData()
        _r["user_fullname"] = _user_name
        _r["user_uuid"] = _du_uuid
        _r["uuid"] = _du_uuid
        return

    def _exist_user(self, _request, _user_uuid):
        _key = DeviceUser.__tablename__ + ".uuid." + _user_uuid

        if not self.application.redis.exists(_key):
            logging.error("CHECK CODE")
            self.setErrorCode(API_ERR.SYS_ERR)
            return
        
        _is_service_user = self.application.redis.hget(_key, "is_service_user")
        
        if "True" == _is_service_user:
            logging.error("user is service user who can not help himself ^_^.")
            self.setErrorCode(API_ERR.NOT_PORTAL)
            return

        _user_fullname = self.application.redis.hget(_key, "user_fullname")
        if _user_fullname != _request.get("ent_user_fullname"):
            _row = DeviceUser(uuid=_user_uuid, user_fullname=_request.get("ent_user_fullname"))
            _row.update_redis_keys(self.application.redis)
            _row.async_update(self.application.redis)
        
        _r = self.getReturnData()
        _r["user_fullname"] = _user_fullname
        _r["user_uuid"] = _user_uuid
        _r["uuid"] = _user_uuid
        return
    
    def initialize(self):
        self.addPermission(api_level=API_LEVEL.PPCOM)
        self.addPermission(api_level=API_LEVEL.PPCONSOLE)
        self.addPermission(api_level=API_LEVEL.THIRD_PARTY_CONSOLE)
        return

    def _Task(self):
        super(self.__class__, self)._Task()
        _request = json.loads(self.request.body)

        # TODO: use this to merge messages 
        _ppcom_trace_uuid = _request.get("ppcom_trace_uuid")
        
        _ent_user_id = _request.get("ent_user_id")
        _ent_user_name = _request.get("ent_user_name")

        if not all([_ent_user_id, _ent_user_name]):
            logging.error("wrong parameters %s" % _request)
            self.setErrorCode(API_ERR.NO_PARA)
            return

        _key = DeviceUser.__tablename__ + ".ent_user_uuid." + _ent_user_id
        _user_uuid = self.application.redis.get(_key)
        
        if not _user_uuid:
            logging.info("no user related to ent_user_uuid: %s" % _ent_user_id)
            return self._new_user(_request)

        return self._exist_user(_request, _user_uuid)

