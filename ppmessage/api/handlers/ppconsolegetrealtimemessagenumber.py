# -*- coding: utf-8 -*-
#
# Copyright (C) 2010-2016 PPMessage.
# Guijin Ding, dingguijin@gmail.com
# All rights reserved
#
#
# api/handlers/ppconsolegetrealtimemessagenumber.py
#
#

from .basehandler import BaseHandler
from ppmessage.api.error import API_ERR

from ppmessage.core.constant import API_LEVEL
from ppmessage.db.models import MessagePushTask

import traceback
import datetime
import logging
import redis
import json

class PPConsoleGetRealTimeMessageNumber(BaseHandler):

    def _get(self):
        _request = json.loads(self.request.body)
        _redis = self.application.redis
        _number = []
        _today = datetime.datetime.now().strftime("%Y-%m-%d")
        for _i in range(24):
            _data = {}
            _customers = set()
            _key = MessagePushTask.__tablename__ + \
                   ".day." + _today + ".hour." + str(_i)
            _data[str(_i)] = _redis.get(_key)
            _number.append(_data)
        _r = self.getReturnData()
        _r["number"] = _number
        return

    def initialize(self):
        self.addPermission(api_level=API_LEVEL.PPCONSOLE)
        return

    def _Task(self):
        self._get()

