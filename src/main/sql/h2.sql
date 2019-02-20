
    drop table stm_apparb if exists;

    drop table stm_appfon if exists;

    drop table stm_approl if exists;

    drop table stm_apps if exists;

    drop table stm_arbol if exists;

    drop table stm_arbolnod if exists;

    drop table stm_arbrol if exists;

    drop table stm_cargo if exists;

    drop table stm_carto if exists;

    drop table stm_conexion if exists;

    drop table stm_dispcarto if exists;

    drop table stm_disptarea if exists;

    drop table stm_eterrit if exists;

    drop table stm_fondo if exists;

    drop table stm_gcacar if exists;

    drop table stm_grpcarto if exists;

    drop table stm_grptar if exists;

    drop table stm_grpter if exists;

    drop table stm_log if exists;

    drop table stm_paramapp if exists;

    drop table stm_paramser if exists;

    drop table stm_paramtta if exists;

    drop table stm_roles if exists;

    drop table stm_rolgca if exists;

    drop table stm_roltar if exists;

    drop table stm_servicio if exists;

    drop table stm_tarea if exists;

    drop table stm_tarea_ui if exists;

    drop table stm_tipogrp if exists;

    drop table stm_tipotarea if exists;

    drop table stm_usuario if exists;

    drop table stm_usuconf if exists;

    drop sequence if exists stm_seq;

    create sequence stm_seq start with 1 increment by 50;

    create table stm_apparb (
        apa_codapp bigint not null,
        apa_codarb bigint not null,
        primary key (apa_codapp, apa_codarb)
    );

    create table stm_appfon (
        apf_codigo bigint not null,
        apf_orden integer,
        apf_codapp bigint,
        apf_codfon bigint,
        primary key (apf_codigo)
    );

    create table stm_approl (
        apr_codapp bigint not null,
        apr_codrol bigint not null,
        primary key (apr_codapp, apr_codrol)
    );

    create table stm_apps (
        app_codigo bigint not null,
        app_f_alta timestamp,
        app_nombre varchar(80),
        app_project varchar(250),
        app_escalas varchar(250),
        app_tema varchar(80),
        app_titulo varchar(250),
        app_autorefr boolean,
        app_tipo varchar(250),
        app_codgca bigint,
        primary key (app_codigo)
    );

    create table stm_arbol (
        arb_codigo bigint not null,
        arb_nombre varchar(100),
        primary key (arb_codigo)
    );

    create table stm_arbolnod (
        anr_codigo bigint not null,
        arn_activo boolean,
        arn_nombre varchar(80),
        arn_orden integer,
        arn_tooltip varchar(100),
        arn_codcar bigint,
        arn_codpadre bigint,
        arn_codarb bigint,
        primary key (anr_codigo)
    );

    create table stm_arbrol (
        arr_codarb bigint not null,
        arr_codrol bigint not null,
        primary key (arr_codarb, arr_codrol)
    );

    create table stm_cargo (
        cgo_codigo bigint not null,
        cgo_f_alta timestamp,
        cgo_f_caduc timestamp,
        cgo_correo varchar(250),
        cgo_cargo varchar(250),
        cgo_org varchar(250),
        cgo_codter bigint,
        cgo_codusu bigint,
        primary key (cgo_codigo)
    );

    create table stm_carto (
        car_codigo bigint not null,
        car_f_alta timestamp,
        car_editable boolean,
        car_tipogeom varchar(255),
        car_capas varchar(500),
        car_leyendtip varchar(50),
        car_leyendurl varchar(250),
        car_esc_max integer,
        car_metaurl varchar(255),
        car_esc_min integer,
        car_nombre varchar(100),
        car_orden integer,
        car_queryact boolean,
        car_querylay boolean,
        car_queryabl boolean,
        car_selectabl boolean,
        car_selectlay varchar(500),
        car_tematizable boolean,
        car_transp integer,
        car_tipo varchar(30),
        car_visible boolean,
        car_codcon bigint,
        car_codsersel bigint,
        car_codser bigint,
        primary key (car_codigo)
    );

    create table stm_conexion (
        con_codigo bigint not null,
        con_constring varchar(250),
        con_nombre varchar(80),
        con_password varchar(50),
        con_driver varchar(50),
        con_usuario varchar(50),
        primary key (con_codigo)
    );

    create table stm_dispcarto (
        dca_codigo bigint not null,
        dca_f_alta timestamp,
        dca_codcar bigint,
        dca_codter bigint,
        primary key (dca_codigo)
    );

    create table stm_disptarea (
        dta_codigo bigint not null,
        dta_f_alta timestamp,
        dta_codtar bigint,
        dta_codter bigint,
        primary key (dta_codigo)
    );

    create table stm_eterrit (
        ter_codigo bigint not null,
        ter_direcc varchar(250),
        ter_bloq boolean,
        ter_observ varchar(250),
        ter_f_alta timestamp,
        ter_correo varchar(250),
        ter_ext varchar(250),
        ter_logo varchar(250),
        ter_nombre varchar(250) not null,
        ter_nadmin varchar(250),
        ter_ambito varchar(250),
        ter_codtgr bigint,
        primary key (ter_codigo)
    );

    create table stm_fondo (
        fon_codigo bigint not null,
        fon_activo boolean,
        fon_f_alta timestamp,
        fon_desc varchar(250),
        fon_nombre varchar(30),
        fon_codgca bigint,
        primary key (fon_codigo)
    );

    create table stm_gcacar (
        gcc_codgca bigint not null,
        gcc_codcar bigint not null,
        primary key (gcc_codgca, gcc_codcar)
    );

    create table stm_grpcarto (
        gca_codigo bigint not null,
        gca_nombre varchar(80),
        gca_tipo varchar(30),
        primary key (gca_codigo)
    );

    create table stm_grptar (
        gta_codigo bigint not null,
        gta_nombre varchar(80),
        primary key (gta_codigo)
    );

    create table stm_grpter (
        grt_codter bigint not null,
        grt_codterm bigint not null,
        primary key (grt_codterm, grt_codter)
    );

    create table stm_log (
        log_codigo bigint not null,
        log_codapp varchar(255),
        log_codtar varchar(255),
        log_codter varchar(255),
        log_codusu varchar(255),
        log_cont bigint,
        log_fecha timestamp,
        log_tipo varchar(50),
        primary key (log_codigo)
    );

    create table stm_paramapp (
        pap_codigo bigint not null,
        pap_nombre varchar(30),
        pap_tipo varchar(250),
        pap_valor varchar(250),
        pap_codapp bigint,
        primary key (pap_codigo)
    );

    create table stm_paramser (
        pse_codigo bigint not null,
        pse_nombre varchar(30),
        pse_tipo varchar(250),
        pse_valor varchar(250),
        pse_codser bigint,
        primary key (pse_codigo)
    );

    create table stm_paramtta (
        ptt_codigo bigint not null,
        ptt_nombre varchar(50),
        ptt_orden integer,
        ptt_tipo varchar(30),
        ptt_valor varchar(512),
        ptt_codtar bigint,
        primary key (ptt_codigo)
    );

    create table stm_roles (
        rol_codigo bigint not null,
        rol_observ varchar(500),
        rol_nombre varchar(250) not null,
        primary key (rol_codigo)
    );

    create table stm_rolgca (
        rgc_codrol bigint not null,
        rgc_codgca bigint not null,
        primary key (rgc_codrol, rgc_codgca)
    );

    create table stm_roltar (
        rta_codrol bigint not null,
        rta_codtar bigint not null,
        primary key (rta_codrol, rta_codtar)
    );

    create table stm_servicio (
        ser_codigo bigint not null,
        ser_f_alta timestamp,
        ser_infourl varchar(250),
        ser_leyenda varchar(250),
        ser_nombre varchar(30),
        ser_projects varchar(1000),
        ser_tipo varchar(30),
        ser_url varchar(250),
        ser_codcon bigint,
        primary key (ser_codigo)
    );

    create table stm_tarea (
        tar_codigo bigint not null,
        tar_f_alta timestamp,
        tar_nombre varchar(50),
        tar_orden integer,
        tar_codcon bigint,
        tar_codgta bigint,
        tar_codtta bigint,
        tar_codtui bigint,
        primary key (tar_codigo)
    );

    create table stm_tarea_ui (
        tui_codigo bigint not null,
        tui_nombre varchar(30),
        tui_orden integer,
        tui_tooltip varchar(100),
        tui_tipo varchar(30),
        primary key (tui_codigo)
    );

    create table stm_tipogrp (
        tgr_codigo bigint not null,
        tgr_nombre varchar(250) not null,
        primary key (tgr_codigo)
    );

    create table stm_tipotarea (
        tta_codigo bigint not null,
        tta_nombre varchar(30),
        primary key (tta_codigo)
    );

    create table stm_usuario (
        usu_codigo bigint not null,
        usu_adm boolean,
        usu_bloq boolean,
        usu_nombre varchar(30),
        usu_apellidos varchar(40),
        usu_password varchar(128),
        usu_usuario varchar(30) not null,
        primary key (usu_codigo)
    );

    create table stm_usuconf (
        ucf_codigo bigint not null,
        ucf_codrol bigint,
        ucf_codter bigint,
        ucf_codusu bigint,
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
