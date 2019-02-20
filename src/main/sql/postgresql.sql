
    alter table stm_apparb 
        drop constraint STM_APA_FK_ARB;

    alter table stm_apparb 
        drop constraint STM_APA_FK_APP;

    alter table stm_appfon 
        drop constraint STM_APF_FK_APP;

    alter table stm_appfon 
        drop constraint STM_APF_FK_FON;

    alter table stm_approl 
        drop constraint STM_APR_FK_ROl;

    alter table stm_approl 
        drop constraint STM_APR_FK_APP;

    alter table stm_apps 
        drop constraint STM_APP_FK_GCA;

    alter table stm_arbolnod 
        drop constraint STM_ARN_FK_CAR;

    alter table stm_arbolnod 
        drop constraint STM_ARN_FK_PADRE;

    alter table stm_arbolnod 
        drop constraint STM_ARN_FK_ARB;

    alter table stm_arbrol 
        drop constraint STM_ARR_FK_ROL;

    alter table stm_arbrol 
        drop constraint STM_ARR_FK_ARB;

    alter table stm_cargo 
        drop constraint STM_CGO_FK_TER;

    alter table stm_cargo 
        drop constraint STM_CGO_FK_USU;

    alter table stm_carto 
        drop constraint STM_CAR_FK_CON;

    alter table stm_carto 
        drop constraint STM_CAR_FK_SERSEL;

    alter table stm_carto 
        drop constraint STM_CAR_FK_SER;

    alter table stm_dispcarto 
        drop constraint STM_DCA_FK_CAR;

    alter table stm_dispcarto 
        drop constraint STM_DCA_FK_TER;

    alter table stm_disptarea 
        drop constraint STM_DTA_FK_TAR;

    alter table stm_disptarea 
        drop constraint STM_DTA_FK_TER;

    alter table stm_eterrit 
        drop constraint STM_TER_FK_TGR;

    alter table stm_fondo 
        drop constraint STM_FON_FK_GCA;

    alter table stm_gcacar 
        drop constraint STM_GCC_FK_CAR;

    alter table stm_gcacar 
        drop constraint STM_GCC_FK_GCA;

    alter table stm_grpter 
        drop constraint STM_GRT_FK_TERM;

    alter table stm_grpter 
        drop constraint STM_GRT_FK_TER;

    alter table stm_paramapp 
        drop constraint STM_PAP_FK_APP;

    alter table stm_paramser 
        drop constraint STM_PSE_FK_SER;

    alter table stm_paramtta 
        drop constraint STM_PTT_FK_TAR;

    alter table stm_rolgca 
        drop constraint STM_RGC_FK_GCA;

    alter table stm_rolgca 
        drop constraint STM_RGC_FK_ROL;

    alter table stm_roltar 
        drop constraint STM_RTA_FK_TAR;

    alter table stm_roltar 
        drop constraint STM_RTA_FK_ROL;

    alter table stm_servicio 
        drop constraint STM_SER_FK_CON;

    alter table stm_tarea 
        drop constraint STM_TAR_FK_CON;

    alter table stm_tarea 
        drop constraint STM_TAR_FK_GTA;

    alter table stm_tarea 
        drop constraint STM_TAR_FK_TTA;

    alter table stm_tarea 
        drop constraint STM_TAR_FK_TUI;

    alter table stm_usuconf 
        drop constraint STM_UCF_FK_ROL;

    alter table stm_usuconf 
        drop constraint STM_UCF_FK_TER;

    alter table stm_usuconf 
        drop constraint STM_UCF_FK_USU;

    drop table if exists stm_apparb cascade;

    drop table if exists stm_appfon cascade;

    drop table if exists stm_approl cascade;

    drop table if exists stm_apps cascade;

    drop table if exists stm_arbol cascade;

    drop table if exists stm_arbolnod cascade;

    drop table if exists stm_arbrol cascade;

    drop table if exists stm_cargo cascade;

    drop table if exists stm_carto cascade;

    drop table if exists stm_conexion cascade;

    drop table if exists stm_dispcarto cascade;

    drop table if exists stm_disptarea cascade;

    drop table if exists stm_eterrit cascade;

    drop table if exists stm_fondo cascade;

    drop table if exists stm_gcacar cascade;

    drop table if exists stm_grpcarto cascade;

    drop table if exists stm_grptar cascade;

    drop table if exists stm_grpter cascade;

    drop table if exists stm_log cascade;

    drop table if exists stm_paramapp cascade;

    drop table if exists stm_paramser cascade;

    drop table if exists stm_paramtta cascade;

    drop table if exists stm_roles cascade;

    drop table if exists stm_rolgca cascade;

    drop table if exists stm_roltar cascade;

    drop table if exists stm_servicio cascade;

    drop table if exists stm_tarea cascade;

    drop table if exists stm_tarea_ui cascade;

    drop table if exists stm_tipogrp cascade;

    drop table if exists stm_tipotarea cascade;

    drop table if exists stm_usuario cascade;

    drop table if exists stm_usuconf cascade;

    drop sequence stm_seq;

    create sequence stm_seq start 1 increment 50;

    create table stm_apparb (
        apa_codapp int8 not null,
        apa_codarb int8 not null,
        primary key (apa_codapp, apa_codarb)
    );

    create table stm_appfon (
        apf_codigo int8 not null,
        apf_orden int4,
        apf_codapp int8,
        apf_codfon int8,
        primary key (apf_codigo)
    );

    create table stm_approl (
        apr_codapp int8 not null,
        apr_codrol int8 not null,
        primary key (apr_codapp, apr_codrol)
    );

    create table stm_apps (
        app_codigo int8 not null,
        app_f_alta timestamp,
        app_nombre varchar(80),
        app_project varchar(250),
        app_escalas varchar(250),
        app_tema varchar(80),
        app_titulo varchar(250),
        app_autorefr boolean,
        app_tipo varchar(250),
        app_codgca int8,
        primary key (app_codigo)
    );

    create table stm_arbol (
        arb_codigo int8 not null,
        arb_nombre varchar(100),
        primary key (arb_codigo)
    );

    create table stm_arbolnod (
        anr_codigo int8 not null,
        arn_activo boolean,
        arn_nombre varchar(80),
        arn_orden int4,
        arn_tooltip varchar(100),
        arn_codcar int8,
        arn_codpadre int8,
        arn_codarb int8,
        primary key (anr_codigo)
    );

    create table stm_arbrol (
        arr_codarb int8 not null,
        arr_codrol int8 not null,
        primary key (arr_codarb, arr_codrol)
    );

    create table stm_cargo (
        cgo_codigo int8 not null,
        cgo_f_alta timestamp,
        cgo_f_caduc timestamp,
        cgo_correo varchar(250),
        cgo_cargo varchar(250),
        cgo_org varchar(250),
        cgo_codter int8,
        cgo_codusu int8,
        primary key (cgo_codigo)
    );

    create table stm_carto (
        car_codigo int8 not null,
        car_f_alta timestamp,
        car_editable boolean,
        car_tipogeom varchar(255),
        car_capas varchar(500),
        car_leyendtip varchar(50),
        car_leyendurl varchar(250),
        car_esc_max int4,
        car_metaurl varchar(255),
        car_esc_min int4,
        car_nombre varchar(100),
        car_orden int4,
        car_queryact boolean,
        car_querylay boolean,
        car_queryabl boolean,
        car_selectabl boolean,
        car_selectlay varchar(500),
        car_tematizable boolean,
        car_transp int4,
        car_tipo varchar(30),
        car_visible boolean,
        car_codcon int8,
        car_codsersel int8,
        car_codser int8,
        primary key (car_codigo)
    );

    create table stm_conexion (
        con_codigo int8 not null,
        con_constring varchar(250),
        con_nombre varchar(80),
        con_password varchar(50),
        con_driver varchar(50),
        con_usuario varchar(50),
        primary key (con_codigo)
    );

    create table stm_dispcarto (
        dca_codigo int8 not null,
        dca_f_alta timestamp,
        dca_codcar int8,
        dca_codter int8,
        primary key (dca_codigo)
    );

    create table stm_disptarea (
        dta_codigo int8 not null,
        dta_f_alta timestamp,
        dta_codtar int8,
        dta_codter int8,
        primary key (dta_codigo)
    );

    create table stm_eterrit (
        ter_codigo int8 not null,
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
        ter_codtgr int8,
        primary key (ter_codigo)
    );

    create table stm_fondo (
        fon_codigo int8 not null,
        fon_activo boolean,
        fon_f_alta timestamp,
        fon_desc varchar(250),
        fon_nombre varchar(30),
        fon_codgca int8,
        primary key (fon_codigo)
    );

    create table stm_gcacar (
        gcc_codgca int8 not null,
        gcc_codcar int8 not null,
        primary key (gcc_codgca, gcc_codcar)
    );

    create table stm_grpcarto (
        gca_codigo int8 not null,
        gca_nombre varchar(80),
        gca_tipo varchar(30),
        primary key (gca_codigo)
    );

    create table stm_grptar (
        gta_codigo int8 not null,
        gta_nombre varchar(80),
        primary key (gta_codigo)
    );

    create table stm_grpter (
        grt_codter int8 not null,
        grt_codterm int8 not null,
        primary key (grt_codterm, grt_codter)
    );

    create table stm_log (
        log_codigo int8 not null,
        log_codapp varchar(255),
        log_codtar varchar(255),
        log_codter varchar(255),
        log_codusu varchar(255),
        log_cont int8,
        log_fecha timestamp,
        log_tipo varchar(50),
        primary key (log_codigo)
    );

    create table stm_paramapp (
        pap_codigo int8 not null,
        pap_nombre varchar(30),
        pap_tipo varchar(250),
        pap_valor varchar(250),
        pap_codapp int8,
        primary key (pap_codigo)
    );

    create table stm_paramser (
        pse_codigo int8 not null,
        pse_nombre varchar(30),
        pse_tipo varchar(250),
        pse_valor varchar(250),
        pse_codser int8,
        primary key (pse_codigo)
    );

    create table stm_paramtta (
        ptt_codigo int8 not null,
        ptt_nombre varchar(50),
        ptt_orden int4,
        ptt_tipo varchar(30),
        ptt_valor varchar(512),
        ptt_codtar int8,
        primary key (ptt_codigo)
    );

    create table stm_roles (
        rol_codigo int8 not null,
        rol_observ varchar(500),
        rol_nombre varchar(250) not null,
        primary key (rol_codigo)
    );

    create table stm_rolgca (
        rgc_codrol int8 not null,
        rgc_codgca int8 not null,
        primary key (rgc_codrol, rgc_codgca)
    );

    create table stm_roltar (
        rta_codrol int8 not null,
        rta_codtar int8 not null,
        primary key (rta_codrol, rta_codtar)
    );

    create table stm_servicio (
        ser_codigo int8 not null,
        ser_f_alta timestamp,
        ser_infourl varchar(250),
        ser_leyenda varchar(250),
        ser_nombre varchar(30),
        ser_projects varchar(1000),
        ser_tipo varchar(30),
        ser_url varchar(250),
        ser_codcon int8,
        primary key (ser_codigo)
    );

    create table stm_tarea (
        tar_codigo int8 not null,
        tar_f_alta timestamp,
        tar_nombre varchar(50),
        tar_orden int4,
        tar_codcon int8,
        tar_codgta int8,
        tar_codtta int8,
        tar_codtui int8,
        primary key (tar_codigo)
    );

    create table stm_tarea_ui (
        tui_codigo int8 not null,
        tui_nombre varchar(30),
        tui_orden int4,
        tui_tooltip varchar(100),
        tui_tipo varchar(30),
        primary key (tui_codigo)
    );

    create table stm_tipogrp (
        tgr_codigo int8 not null,
        tgr_nombre varchar(250) not null,
        primary key (tgr_codigo)
    );

    create table stm_tipotarea (
        tta_codigo int8 not null,
        tta_nombre varchar(30),
        primary key (tta_codigo)
    );

    create table stm_usuario (
        usu_codigo int8 not null,
        usu_adm boolean,
        usu_bloq boolean,
        usu_nombre varchar(30),
        usu_apellidos varchar(40),
        usu_password varchar(128),
        usu_usuario varchar(30) not null,
        primary key (usu_codigo)
    );

    create table stm_usuconf (
        ucf_codigo int8 not null,
        ucf_codrol int8,
        ucf_codter int8,
        ucf_codusu int8,
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
