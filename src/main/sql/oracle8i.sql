
    drop table stm_apparb cascade constraints;

    drop table stm_appfon cascade constraints;

    drop table stm_approl cascade constraints;

    drop table stm_apps cascade constraints;

    drop table stm_arbol cascade constraints;

    drop table stm_arbolnod cascade constraints;

    drop table stm_arbrol cascade constraints;

    drop table stm_cargo cascade constraints;

    drop table stm_carto cascade constraints;

    drop table stm_conexion cascade constraints;

    drop table stm_dispcarto cascade constraints;

    drop table stm_disptarea cascade constraints;

    drop table stm_eterrit cascade constraints;

    drop table stm_fondo cascade constraints;

    drop table stm_gcacar cascade constraints;

    drop table stm_grpcarto cascade constraints;

    drop table stm_grptar cascade constraints;

    drop table stm_grpter cascade constraints;

    drop table stm_log cascade constraints;

    drop table stm_paramapp cascade constraints;

    drop table stm_paramser cascade constraints;

    drop table stm_paramtta cascade constraints;

    drop table stm_roles cascade constraints;

    drop table stm_rolgca cascade constraints;

    drop table stm_roltar cascade constraints;

    drop table stm_servicio cascade constraints;

    drop table stm_tarea cascade constraints;

    drop table stm_tarea_ui cascade constraints;

    drop table stm_tipogrp cascade constraints;

    drop table stm_tipotarea cascade constraints;

    drop table stm_usuario cascade constraints;

    drop table stm_usuconf cascade constraints;

    drop sequence stm_seq;

    create sequence stm_seq start with 1 increment by 50;

    create table stm_apparb (
        apa_codapp number(19,0) not null,
        apa_codarb number(19,0) not null,
        primary key (apa_codapp, apa_codarb)
    );

    create table stm_appfon (
        apf_codigo number(19,0) not null,
        apf_orden number(10,0),
        apf_codapp number(19,0),
        apf_codfon number(19,0),
        primary key (apf_codigo)
    );

    create table stm_approl (
        apr_codapp number(19,0) not null,
        apr_codrol number(19,0) not null,
        primary key (apr_codapp, apr_codrol)
    );

    create table stm_apps (
        app_codigo number(19,0) not null,
        app_f_alta date,
        app_nombre varchar2(80),
        app_project varchar2(250),
        app_escalas varchar2(250),
        app_tema varchar2(80),
        app_titulo varchar2(250),
        app_autorefr number(1,0),
        app_tipo varchar2(250),
        app_codgca number(19,0),
        primary key (app_codigo)
    );

    create table stm_arbol (
        arb_codigo number(19,0) not null,
        arb_nombre varchar2(100),
        primary key (arb_codigo)
    );

    create table stm_arbolnod (
        anr_codigo number(19,0) not null,
        arn_activo number(1,0),
        arn_nombre varchar2(80),
        arn_orden number(10,0),
        arn_tooltip varchar2(100),
        arn_codcar number(19,0),
        arn_codpadre number(19,0),
        arn_codarb number(19,0),
        primary key (anr_codigo)
    );

    create table stm_arbrol (
        arr_codarb number(19,0) not null,
        arr_codrol number(19,0) not null,
        primary key (arr_codarb, arr_codrol)
    );

    create table stm_cargo (
        cgo_codigo number(19,0) not null,
        cgo_f_alta date,
        cgo_f_caduc date,
        cgo_correo varchar2(250),
        cgo_cargo varchar2(250),
        cgo_org varchar2(250),
        cgo_codter number(19,0),
        cgo_codusu number(19,0),
        primary key (cgo_codigo)
    );

    create table stm_carto (
        car_codigo number(19,0) not null,
        car_f_alta date,
        car_editable number(1,0),
        car_tipogeom varchar2(255),
        car_capas varchar2(500),
        car_leyendtip varchar2(50),
        car_leyendurl varchar2(250),
        car_esc_max number(10,0),
        car_metaurl varchar2(255),
        car_esc_min number(10,0),
        car_nombre varchar2(100),
        car_orden number(10,0),
        car_queryact number(1,0),
        car_querylay number(1,0),
        car_queryabl number(1,0),
        car_selectabl number(1,0),
        car_selectlay varchar2(500),
        car_tematizable number(1,0),
        car_transp number(10,0),
        car_tipo varchar2(30),
        car_visible number(1,0),
        car_codcon number(19,0),
        car_codsersel number(19,0),
        car_codser number(19,0),
        primary key (car_codigo)
    );

    create table stm_conexion (
        con_codigo number(19,0) not null,
        con_constring varchar2(250),
        con_nombre varchar2(80),
        con_password varchar2(50),
        con_driver varchar2(50),
        con_usuario varchar2(50),
        primary key (con_codigo)
    );

    create table stm_dispcarto (
        dca_codigo number(19,0) not null,
        dca_f_alta date,
        dca_codcar number(19,0),
        dca_codter number(19,0),
        primary key (dca_codigo)
    );

    create table stm_disptarea (
        dta_codigo number(19,0) not null,
        dta_f_alta date,
        dta_codtar number(19,0),
        dta_codter number(19,0),
        primary key (dta_codigo)
    );

    create table stm_eterrit (
        ter_codigo number(19,0) not null,
        ter_direcc varchar2(250),
        ter_bloq number(1,0),
        ter_observ varchar2(250),
        ter_f_alta date,
        ter_correo varchar2(250),
        ter_ext varchar2(250),
        ter_logo varchar2(250),
        ter_nombre varchar2(250) not null,
        ter_nadmin varchar2(250),
        ter_ambito varchar2(250),
        ter_codtgr number(19,0),
        primary key (ter_codigo)
    );

    create table stm_fondo (
        fon_codigo number(19,0) not null,
        fon_activo number(1,0),
        fon_f_alta date,
        fon_desc varchar2(250),
        fon_nombre varchar2(30),
        fon_codgca number(19,0),
        primary key (fon_codigo)
    );

    create table stm_gcacar (
        gcc_codgca number(19,0) not null,
        gcc_codcar number(19,0) not null,
        primary key (gcc_codgca, gcc_codcar)
    );

    create table stm_grpcarto (
        gca_codigo number(19,0) not null,
        gca_nombre varchar2(80),
        gca_tipo varchar2(30),
        primary key (gca_codigo)
    );

    create table stm_grptar (
        gta_codigo number(19,0) not null,
        gta_nombre varchar2(80),
        primary key (gta_codigo)
    );

    create table stm_grpter (
        grt_codter number(19,0) not null,
        grt_codterm number(19,0) not null,
        primary key (grt_codterm, grt_codter)
    );

    create table stm_log (
        log_codigo number(19,0) not null,
        log_codapp varchar2(255),
        log_codtar varchar2(255),
        log_codter varchar2(255),
        log_codusu varchar2(255),
        log_cont number(19,0),
        log_fecha date,
        log_tipo varchar2(50),
        primary key (log_codigo)
    );

    create table stm_paramapp (
        pap_codigo number(19,0) not null,
        pap_nombre varchar2(30),
        pap_tipo varchar2(250),
        pap_valor varchar2(250),
        pap_codapp number(19,0),
        primary key (pap_codigo)
    );

    create table stm_paramser (
        pse_codigo number(19,0) not null,
        pse_nombre varchar2(30),
        pse_tipo varchar2(250),
        pse_valor varchar2(250),
        pse_codser number(19,0),
        primary key (pse_codigo)
    );

    create table stm_paramtta (
        ptt_codigo number(19,0) not null,
        ptt_nombre varchar2(50),
        ptt_orden number(10,0),
        ptt_tipo varchar2(30),
        ptt_valor varchar2(512),
        ptt_codtar number(19,0),
        primary key (ptt_codigo)
    );

    create table stm_roles (
        rol_codigo number(19,0) not null,
        rol_observ varchar2(500),
        rol_nombre varchar2(250) not null,
        primary key (rol_codigo)
    );

    create table stm_rolgca (
        rgc_codrol number(19,0) not null,
        rgc_codgca number(19,0) not null,
        primary key (rgc_codrol, rgc_codgca)
    );

    create table stm_roltar (
        rta_codrol number(19,0) not null,
        rta_codtar number(19,0) not null,
        primary key (rta_codrol, rta_codtar)
    );

    create table stm_servicio (
        ser_codigo number(19,0) not null,
        ser_f_alta date,
        ser_infourl varchar2(250),
        ser_leyenda varchar2(250),
        ser_nombre varchar2(30),
        ser_projects varchar2(1000),
        ser_tipo varchar2(30),
        ser_url varchar2(250),
        ser_codcon number(19,0),
        primary key (ser_codigo)
    );

    create table stm_tarea (
        tar_codigo number(19,0) not null,
        tar_f_alta date,
        tar_nombre varchar2(50),
        tar_orden number(10,0),
        tar_codcon number(19,0),
        tar_codgta number(19,0),
        tar_codtta number(19,0),
        tar_codtui number(19,0),
        primary key (tar_codigo)
    );

    create table stm_tarea_ui (
        tui_codigo number(19,0) not null,
        tui_nombre varchar2(30),
        tui_orden number(10,0),
        tui_tooltip varchar2(100),
        tui_tipo varchar2(30),
        primary key (tui_codigo)
    );

    create table stm_tipogrp (
        tgr_codigo number(19,0) not null,
        tgr_nombre varchar2(250) not null,
        primary key (tgr_codigo)
    );

    create table stm_tipotarea (
        tta_codigo number(19,0) not null,
        tta_nombre varchar2(30),
        primary key (tta_codigo)
    );

    create table stm_usuario (
        usu_codigo number(19,0) not null,
        usu_adm number(1,0),
        usu_bloq number(1,0),
        usu_nombre varchar2(30),
        usu_apellidos varchar2(40),
        usu_password varchar2(128),
        usu_usuario varchar2(30) not null,
        primary key (usu_codigo)
    );

    create table stm_usuconf (
        ucf_codigo number(19,0) not null,
        ucf_codrol number(19,0),
        ucf_codter number(19,0),
        ucf_codusu number(19,0),
        primary key (ucf_codigo)
    );

    alter table stm_appfon 
        add constraint UK4kuh9k9q18frfohh52ykcr5dd unique (apf_codapp, apf_codfon);

    alter table stm_dispcarto 
        add constraint UKqs36umt12ykfouct1kp13eq11 unique (dca_codter, dca_codcar);

    alter table stm_disptarea 
        add constraint UKkjxchf9edsutjpxpi5ejxxufk unique (dta_codter, dta_codtar);

    alter table stm_eterrit 
        add constraint UK_ojij5ditcq8ru4xyyv8d4hdif unique (ter_nombre);

    alter table stm_roles 
        add constraint UK_3tibp1rvigw8r4488uq7ejw5j unique (rol_nombre);

    alter table stm_tipogrp 
        add constraint UK_eq25o43qfag7sghcgqovilrh8 unique (tgr_nombre);

    alter table stm_usuario 
        add constraint UK_hb5bfcb8w3wu6h55sshqxt3u6 unique (usu_usuario);

    alter table stm_usuconf 
        add constraint UK4ax9yy3x8sbt7vo4py8skc8q2 unique (ucf_codusu, ucf_codter, ucf_codrol);

    alter table stm_apparb 
        add constraint STM_APA_FK_ARB 
        foreign key (apa_codarb) 
        references stm_arbol;

    alter table stm_apparb 
        add constraint STM_APA_FK_APP 
        foreign key (apa_codapp) 
        references stm_apps;

    alter table stm_appfon 
        add constraint STM_APF_FK_APP 
        foreign key (apf_codapp) 
        references stm_apps;

    alter table stm_appfon 
        add constraint STM_APF_FK_FON 
        foreign key (apf_codfon) 
        references stm_fondo;

    alter table stm_approl 
        add constraint STM_APR_FK_ROl 
        foreign key (apr_codrol) 
        references stm_roles;

    alter table stm_approl 
        add constraint STM_APR_FK_APP 
        foreign key (apr_codapp) 
        references stm_apps;

    alter table stm_apps 
        add constraint STM_APP_FK_GCA 
        foreign key (app_codgca) 
        references stm_grpcarto;

    alter table stm_arbolnod 
        add constraint STM_ARN_FK_CAR 
        foreign key (arn_codcar) 
        references stm_carto;

    alter table stm_arbolnod 
        add constraint STM_ARN_FK_PADRE 
        foreign key (arn_codpadre) 
        references stm_arbolnod;

    alter table stm_arbolnod 
        add constraint STM_ARN_FK_ARB 
        foreign key (arn_codarb) 
        references stm_arbol;

    alter table stm_arbrol 
        add constraint STM_ARR_FK_ROL 
        foreign key (arr_codrol) 
        references stm_roles;

    alter table stm_arbrol 
        add constraint STM_ARR_FK_ARB 
        foreign key (arr_codarb) 
        references stm_arbol;

    alter table stm_cargo 
        add constraint STM_CGO_FK_TER 
        foreign key (cgo_codter) 
        references stm_eterrit;

    alter table stm_cargo 
        add constraint STM_CGO_FK_USU 
        foreign key (cgo_codusu) 
        references stm_usuario;

    alter table stm_carto 
        add constraint STM_CAR_FK_CON 
        foreign key (car_codcon) 
        references stm_conexion;

    alter table stm_carto 
        add constraint STM_CAR_FK_SERSEL 
        foreign key (car_codsersel) 
        references stm_servicio;

    alter table stm_carto 
        add constraint STM_CAR_FK_SER 
        foreign key (car_codser) 
        references stm_servicio;

    alter table stm_dispcarto 
        add constraint STM_DCA_FK_CAR 
        foreign key (dca_codcar) 
        references stm_carto;

    alter table stm_dispcarto 
        add constraint STM_DCA_FK_TER 
        foreign key (dca_codter) 
        references stm_eterrit 
        on delete cascade;

    alter table stm_disptarea 
        add constraint STM_DTA_FK_TAR 
        foreign key (dta_codtar) 
        references stm_tarea;

    alter table stm_disptarea 
        add constraint STM_DTA_FK_TER 
        foreign key (dta_codter) 
        references stm_eterrit;

    alter table stm_eterrit 
        add constraint STM_TER_FK_TGR 
        foreign key (ter_codtgr) 
        references stm_tipogrp;

    alter table stm_fondo 
        add constraint STM_FON_FK_GCA 
        foreign key (fon_codgca) 
        references stm_grpcarto;

    alter table stm_gcacar 
        add constraint STM_GCC_FK_CAR 
        foreign key (gcc_codcar) 
        references stm_carto;

    alter table stm_gcacar 
        add constraint STM_GCC_FK_GCA 
        foreign key (gcc_codgca) 
        references stm_grpcarto;

    alter table stm_grpter 
        add constraint STM_GRT_FK_TERM 
        foreign key (grt_codterm) 
        references stm_eterrit;

    alter table stm_grpter 
        add constraint STM_GRT_FK_TER 
        foreign key (grt_codter) 
        references stm_eterrit;

    alter table stm_paramapp 
        add constraint STM_PAP_FK_APP 
        foreign key (pap_codapp) 
        references stm_apps;

    alter table stm_paramser 
        add constraint STM_PSE_FK_SER 
        foreign key (pse_codser) 
        references stm_servicio;

    alter table stm_paramtta 
        add constraint STM_PTT_FK_TAR 
        foreign key (ptt_codtar) 
        references stm_tarea;

    alter table stm_rolgca 
        add constraint STM_RGC_FK_GCA 
        foreign key (rgc_codgca) 
        references stm_roles;

    alter table stm_rolgca 
        add constraint STM_RGC_FK_ROL 
        foreign key (rgc_codrol) 
        references stm_grpcarto;

    alter table stm_roltar 
        add constraint STM_RTA_FK_TAR 
        foreign key (rta_codtar) 
        references stm_roles;

    alter table stm_roltar 
        add constraint STM_RTA_FK_ROL 
        foreign key (rta_codrol) 
        references stm_tarea;

    alter table stm_servicio 
        add constraint STM_SER_FK_CON 
        foreign key (ser_codcon) 
        references stm_conexion;

    alter table stm_tarea 
        add constraint STM_TAR_FK_CON 
        foreign key (tar_codcon) 
        references stm_conexion;

    alter table stm_tarea 
        add constraint STM_TAR_FK_GTA 
        foreign key (tar_codgta) 
        references stm_grptar;

    alter table stm_tarea 
        add constraint STM_TAR_FK_TTA 
        foreign key (tar_codtta) 
        references stm_tipotarea;

    alter table stm_tarea 
        add constraint STM_TAR_FK_TUI 
        foreign key (tar_codtui) 
        references stm_tarea_ui;

    alter table stm_usuconf 
        add constraint STM_UCF_FK_ROL 
        foreign key (ucf_codrol) 
        references stm_roles 
        on delete cascade;

    alter table stm_usuconf 
        add constraint STM_UCF_FK_TER 
        foreign key (ucf_codter) 
        references stm_eterrit 
        on delete cascade;

    alter table stm_usuconf 
        add constraint STM_UCF_FK_USU 
        foreign key (ucf_codusu) 
        references stm_usuario;
