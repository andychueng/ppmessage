# -*- coding: utf-8 -*-
#
# Copyright (C) 2010-2016 PPMessage.
# Guijin Ding, dingguijin@gmail.com
#
#

from .basehandler import BaseHandler

from ppmessage.api.error import API_ERR
from ppmessage.core.constant import API_LEVEL

import json
import uuid
import logging

from tornado.gen import coroutine
from tornado.ioloop import IOLoop
from tornado.httpclient import HTTPRequest
from tornado.httpclient import AsyncHTTPClient

class PPGetIPInfoHandler(BaseHandler):

    @coroutine
    def _get(self):

        _request = json.loads(self.request.body)
        _app_uuid = _request.get("app_uuid")
        
        _ip = self.request.headers.get("X-Real-Ip") or \
              self.request.headers.get("remote_ip") or \
              self.request.remote_ip

        url = "http://mdmforum.cn:8099/IP2GEO/"
        http_headers = {"Content-Type" : "application/json"}
        
        http_body = {
            "ip": _ip,
            "language": "en",
            "app_uuid": self._app_uuid,
            "app_name": "IPINFO"
        }
        
        http_request = HTTPRequest(
            url, method='POST',
            headers=http_headers,
            validate_cert=False,
            body=json.dumps(http_body)
        )

        http_client = AsyncHTTPClient()
        response = yield http_client.fetch(http_request)

        logging.info("geoservice return: %s" % response.body)
        _body = json.loads(response.body)

        _country_code = "CN"
        if not _body or _body.get("error_code") != 0:
            logging.error("cant get user name by ip: %s" % _ip)
            return
        
        if not _body.get("code"):
            _country_code = _body.get("code").upper()
            
        _r = self.getReturnData()
        _r.update({"country_code": _country_code})
        return
    
    def initialize(self):
        self.addPermission(app_uuid=True)
        self.addPermission(api_level=API_LEVEL.PPCOM)
        return

    def _Task(self):
        super(self.__class__, self)._Task()
        self._get()
        return

