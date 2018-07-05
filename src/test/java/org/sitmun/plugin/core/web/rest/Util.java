package org.sitmun.plugin.core.web.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.charset.Charset;

class Util {

  static MediaType APPLICATION_HAL_JSON_UTF8 = new MediaType("application", "hal+json", Charset.forName("UTF-8"));

  static byte[] convertObjectToJsonBytes(Object object) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    return mapper.writeValueAsBytes(object);
  }
}
