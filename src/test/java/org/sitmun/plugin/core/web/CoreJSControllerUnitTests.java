package org.sitmun.plugin.core.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CoreJSControllerUnitTests {

    @Autowired
    private CoreJSController controller;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void requirejsIsPresent() throws Exception {
        assertThat(controller.webjarjs()).contains("requirejs.config");
    }
}
