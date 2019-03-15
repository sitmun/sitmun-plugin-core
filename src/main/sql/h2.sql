
    drop table STM_APPARB if exists;

    drop table STM_APPFON if exists;

    drop table STM_APPROL if exists;

    drop table STM_APPS if exists;

    drop table STM_ARBOL if exists;

    drop table STM_ARBOLNOD if exists;

    drop table STM_ARBROL if exists;

    drop table STM_CARGO if exists;

    drop table STM_CARTO if exists;

    drop table STM_CONEXION if exists;

    drop table STM_DISPCARTO if exists;

    drop table STM_DISPTAREA if exists;

    drop table STM_ETERRIT if exists;

    drop table STM_FONDO if exists;

    drop table STM_GCACAR if exists;

    drop table STM_GRPCARTO if exists;

    drop table STM_GRPTAR if exists;

    drop table STM_GRPTER if exists;

    drop table STM_LOG if exists;

    drop table STM_PARAMAPP if exists;

    drop table STM_PARAMSER if exists;

    drop table STM_PARAMTTA if exists;

    drop table STM_ROLES if exists;

    drop table STM_ROLGCA if exists;

    drop table STM_ROLTAR if exists;

    drop table STM_SERVICIO if exists;

    drop table STM_TAREA if exists;

    drop table STM_TAREA_UI if exists;

    drop table STM_TIPOGRP if exists;

    drop table STM_TIPOTAREA if exists;

    drop table STM_USUARIO if exists;

    drop table STM_USUCONF if exists;

    drop sequence if exists STM_SEQ;

    create sequence STM_SEQ start with 1 increment by 50;

    create table STM_APPARB (
        APA_CODAPP bigint not null,
        APA_CODARB bigint not null,
        primary key (APA_CODAPP, APA_CODARB)
    );

    create table STM_APPFON (
        APF_CODIGO bigint not null,
        APF_ORDEN integer,
        APF_CODAPP bigint,
        APF_CODFON bigint,
        primary key (APF_CODIGO)
    );

    create table STM_APPROL (
        APR_CODAPP bigint not null,
        APR_CODROL bigint not null,
        primary key (APR_CODAPP, APR_CODROL)
    );

    create table STM_APPS (
        APP_CODIGO bigint not null,
        APP_F_ALTA timestamp,
        APP_NOMBRE varchar(80),
        APP_PROJECT varchar(250),
        APP_ESCALAS varchar(250),
        APP_TEMA varchar(80),
        APP_TITULO varchar(250),
        APP_AUTOREFR boolean,
        APP_TIPO varchar(250),
        APP_CODGCA bigint,
        primary key (APP_CODIGO)
    );

    create table STM_ARBOL (
        ARB_CODIGO bigint not null,
        ARB_NOMBRE varchar(100),
        primary key (ARB_CODIGO)
    );

    create table STM_ARBOLNOD (
        ANR_CODIGO bigint not null,
        ARN_ACTIVO boolean,
        ARN_NOMBRE varchar(80),
        ARN_ORDEN integer,
        ARN_TOOLTIP varchar(100),
        ARN_CODCAR bigint,
        ARN_CODPADRE bigint,
        ARN_CODARB bigint,
        primary key (ANR_CODIGO)
    );

    create table STM_ARBROL (
        ARR_CODARB bigint not null,
        arr_codrol bigint not null,
        primary key (ARR_CODARB, arr_codrol)
    );

    create table STM_CARGO (
        CGO_CODIGO bigint not null,
        CGO_F_ALTA timestamp,
        CGO_F_CADUC timestamp,
        CGO_CORREO varchar(250),
        CGO_CARGO varchar(250),
        CGO_ORG varchar(250),
        CGO_CODTER bigint,
        CGO_CODUSU bigint,
        primary key (CGO_CODIGO)
    );

    create table STM_CARTO (
        CAR_CODIGO bigint not null,
        CAR_F_ALTA timestamp,
        CAR_EDITABLE boolean,
        CAR_TIPOGEOM varchar(255),
        CAR_CAPAS varchar(500),
        CAR_LEYENDTIP varchar(50),
        CAR_LEYENDURL varchar(250),
        CAR_ESC_MAX integer,
        CAR_METAURL varchar(255),
        CAR_ESC_MIN integer,
        CAR_NOMBRE varchar(100),
        CAR_ORDEN integer,
        CAR_QUERYACT boolean,
        CAR_QUERYLAY boolean,
        CAR_QUERYABL boolean,
        CAR_SELECTABL boolean,
        CAR_SELECTLAY varchar(500),
        CAR_TEMATIZABLE boolean,
        CAR_TRANSP integer,
        CAR_TIPO varchar(30),
        CAR_VISIBLE boolean,
        CAR_CODCON bigint,
        CAR_CODSERSEL bigint,
        CAR_CODSER bigint,
        primary key (CAR_CODIGO)
    );

    create table STM_CONEXION (
        CON_CODIGO bigint not null,
        CON_CONSTRING varchar(250),
        CON_NOMBRE varchar(80),
        CON_PASSWORD varchar(50),
        CON_DRIVER varchar(50),
        CON_USUARIO varchar(50),
        primary key (CON_CODIGO)
    );

    create table STM_DISPCARTO (
        DCA_CODIGO bigint not null,
        DCA_F_ALTA timestamp,
        DCA_CODCAR bigint,
        DCA_CODTER bigint,
        primary key (DCA_CODIGO)
    );

    create table STM_DISPTAREA (
        DTA_CODIGO bigint not null,
        DTA_F_ALTA timestamp,
        DTA_CODTAR bigint,
        DTA_CODTER bigint,
        primary key (DTA_CODIGO)
    );

    create table STM_ETERRIT (
        TER_CODIGO bigint not null,
        TER_DIRECC varchar(250),
        TER_BLOQ boolean,
        TER_OBSERV varchar(250),
        TER_F_ALTA timestamp,
        TER_CORREO varchar(250),
        TER_EXT varchar(250),
        TER_LOGO varchar(250),
        TER_NOMBRE varchar(250) not null,
        TER_NADMIN varchar(250),
        TER_AMBITO varchar(250),
        TER_CODTGR bigint,
        primary key (TER_CODIGO)
    );

    create table STM_FONDO (
        FON_CODIGO bigint not null,
        FON_ACTIVO boolean,
        FON_F_ALTA timestamp,
        FON_DESC varchar(250),
        FON_NOMBRE varchar(30),
        FON_CODGCA bigint,
        primary key (FON_CODIGO)
    );

    create table STM_GCACAR (
        GCC_CODGCA bigint not null,
        GCC_CODCAR bigint not null,
        primary key (GCC_CODGCA, GCC_CODCAR)
    );

    create table STM_GRPCARTO (
        GCA_CODIGO bigint not null,
        GCA_NOMBRE varchar(80),
        GCA_TIPO varchar(30),
        primary key (GCA_CODIGO)
    );

    create table STM_GRPTAR (
        GTA_CODIGO bigint not null,
        GTA_NOMBRE varchar(80),
        primary key (GTA_CODIGO)
    );

    create table STM_GRPTER (
        GRT_CODTER bigint not null,
        GRT_CODTERM bigint not null,
        primary key (GRT_CODTERM, GRT_CODTER)
    );

    create table STM_LOG (
        LOG_CODIGO bigint not null,
        LOG_CODAPP varchar(255),
        LOG_CODTAR varchar(255),
        LOG_CODTER varchar(255),
        LOG_CODUSU varchar(255),
        LOG_CONT bigint,
        LOG_FECHA timestamp,
        LOG_TIPO varchar(50),
        primary key (LOG_CODIGO)
    );

    create table STM_PARAMAPP (
        PAP_CODIGO bigint not null,
        PAP_NOMBRE varchar(30),
        PAP_TIPO varchar(250),
        PAP_VALOR varchar(250),
        PAP_CODAPP bigint,
        primary key (PAP_CODIGO)
    );

    create table STM_PARAMSER (
        PSE_CODIGO bigint not null,
        PSE_NOMBRE varchar(30),
        PSE_TIPO varchar(250),
        PSE_VALOR varchar(250),
        PSE_CODSER bigint,
        primary key (PSE_CODIGO)
    );

    create table STM_PARAMTTA (
        PTT_CODIGO bigint not null,
        PTT_NOMBRE varchar(50),
        PTT_ORDEN integer,
        PTT_TIPO varchar(30),
        PTT_VALOR varchar(512),
        PTT_CODTAR bigint,
        primary key (PTT_CODIGO)
    );

    create table STM_ROLES (
        ROL_CODIGO bigint not null,
        ROL_OBSERV varchar(500),
        ROL_NOMBRE varchar(250) not null,
        primary key (ROL_CODIGO)
    );

    create table STM_ROLGCA (
        RGC_CODROL bigint not null,
        RGC_CODGCA bigint not null,
        primary key (RGC_CODROL, RGC_CODGCA)
    );

    create table STM_ROLTAR (
        RTA_CODROL bigint not null,
        RTA_CODTAR bigint not null,
        primary key (RTA_CODROL, RTA_CODTAR)
    );

    create table STM_SERVICIO (
        SER_CODIGO bigint not null,
        SER_F_ALTA timestamp,
        SER_INFOURL varchar(250),
        SER_LEYENDA varchar(250),
        SER_NOMBRE varchar(30),
        SER_PROJECTS varchar(1000),
        SER_TIPO varchar(30),
        SER_URL varchar(250),
        SER_CODCON bigint,
        primary key (SER_CODIGO)
    );

    create table STM_TAREA (
        TAR_CODIGO bigint not null,
        TAR_F_ALTA timestamp,
        TAR_NOMBRE varchar(50),
        TAR_ORDEN integer,
        TAR_CODCON bigint,
        TAR_CODGTA bigint,
        TAR_CODTTA bigint,
        TAR_CODTUI bigint,
        primary key (TAR_CODIGO)
    );

    create table STM_TAREA_UI (
        TUI_CODIGO bigint not null,
        TUI_NOMBRE varchar(30),
        TUI_ORDEN integer,
        TUI_TOOLTIP varchar(100),
        TUI_TIPO varchar(30),
        primary key (TUI_CODIGO)
    );

    create table STM_TIPOGRP (
        TGR_CODIGO bigint not null,
        TGR_NOMBRE varchar(250) not null,
        primary key (TGR_CODIGO)
    );

    create table STM_TIPOTAREA (
        TTA_CODIGO bigint not null,
        TTA_NOMBRE varchar(30),
        primary key (TTA_CODIGO)
    );

    create table STM_USUARIO (
        USU_CODIGO bigint not null,
        USU_ADM boolean,
        USU_BLOQ boolean,
        USU_NOMBRE varchar(30),
        USU_APELLIDOS varchar(40),
        USU_PASSWORD varchar(128),
        USU_USUARIO varchar(30) not null,
        primary key (USU_CODIGO)
    );

    create table STM_USUCONF (
        UCF_CODIGO bigint not null,
        UCF_CODROL bigint,
        UCF_CODTER bigint,
        UCF_CODUSU bigint,
        primary key (UCF_CODIGO)
    );

    alter table STM_APPFON 
        add constraint STM_APF_UK unique (APF_CODAPP, APF_CODFON);

    alter table STM_DISPCARTO 
        add constraint STM_DCA_UK unique (DCA_CODTER, DCA_CODCAR);

    alter table STM_DISPTAREA 
        add constraint STM_DTA_UK unique (DTA_CODTER, DTA_CODTAR);

    alter table STM_ETERRIT 
        add constraint STM_TER_NOM_UK unique (TER_NOMBRE);

    alter table STM_ROLES 
        add constraint STM_ROL_NOM_UK unique (ROL_NOMBRE);

    alter table STM_TIPOGRP 
        add constraint STM_TGR_NOM_UK unique (TGR_NOMBRE);

    alter table STM_USUARIO 
        add constraint STM_USU_USU_UK unique (USU_USUARIO);

    alter table STM_USUCONF 
        add constraint STM_UCF_UK unique (UCF_CODUSU, UCF_CODTER, UCF_CODROL);

    alter table STM_APPARB 
        add constraint STM_APA_FK_ARB 
        foreign key (APA_CODARB) 
        references STM_ARBOL;

    alter table STM_APPARB 
        add constraint STM_APA_FK_APP 
        foreign key (APA_CODAPP) 
        references STM_APPS;

    alter table STM_APPFON 
        add constraint STM_APF_FK_APP 
        foreign key (APF_CODAPP) 
        references STM_APPS;

    alter table STM_APPFON 
        add constraint STM_APF_FK_FON 
        foreign key (APF_CODFON) 
        references STM_FONDO;

    alter table STM_APPROL 
        add constraint STM_APR_FK_ROL 
        foreign key (APR_CODROL) 
        references STM_ROLES;

    alter table STM_APPROL 
        add constraint STM_APR_FK_APP 
        foreign key (APR_CODAPP) 
        references STM_APPS;

    alter table STM_APPS 
        add constraint STM_APP_FK_GCA 
        foreign key (APP_CODGCA) 
        references STM_GRPCARTO;

    alter table STM_ARBOLNOD 
        add constraint STM_ARN_FK_CAR 
        foreign key (ARN_CODCAR) 
        references STM_CARTO;

    alter table STM_ARBOLNOD 
        add constraint STM_ARN_FK_ARN 
        foreign key (ARN_CODPADRE) 
        references STM_ARBOLNOD;

    alter table STM_ARBOLNOD 
        add constraint STM_ARN_FK_ARB 
        foreign key (ARN_CODARB) 
        references STM_ARBOL;

    alter table STM_ARBROL 
        add constraint STM_ARR_FK_ROL 
        foreign key (arr_codrol) 
        references STM_ROLES;

    alter table STM_ARBROL 
        add constraint STM_ARR_FK_ARB 
        foreign key (ARR_CODARB) 
        references STM_ARBOL;

    alter table STM_CARGO 
        add constraint STM_CGO_FK_TER 
        foreign key (CGO_CODTER) 
        references STM_ETERRIT;

    alter table STM_CARGO 
        add constraint STM_CGO_FK_USU 
        foreign key (CGO_CODUSU) 
        references STM_USUARIO;

    alter table STM_CARTO 
        add constraint STM_CAR_FK_CON 
        foreign key (CAR_CODCON) 
        references STM_CONEXION;

    alter table STM_CARTO 
        add constraint STM_CAR_FK_SERSEL 
        foreign key (CAR_CODSERSEL) 
        references STM_SERVICIO;

    alter table STM_CARTO 
        add constraint STM_CAR_FK_SER 
        foreign key (CAR_CODSER) 
        references STM_SERVICIO;

    alter table STM_DISPCARTO 
        add constraint STM_DCA_FK_CAR 
        foreign key (DCA_CODCAR) 
        references STM_CARTO;

    alter table STM_DISPCARTO 
        add constraint STM_DCA_FK_TER 
        foreign key (DCA_CODTER) 
        references STM_ETERRIT 
        on delete cascade;

    alter table STM_DISPTAREA 
        add constraint STM_DTA_FK_TAR 
        foreign key (DTA_CODTAR) 
        references STM_TAREA;

    alter table STM_DISPTAREA 
        add constraint STM_DTA_FK_TER 
        foreign key (DTA_CODTER) 
        references STM_ETERRIT;

    alter table STM_ETERRIT 
        add constraint STM_TER_FK_TGR 
        foreign key (TER_CODTGR) 
        references STM_TIPOGRP;

    alter table STM_FONDO 
        add constraint STM_FON_FK_GCA 
        foreign key (FON_CODGCA) 
        references STM_GRPCARTO;

    alter table STM_GCACAR 
        add constraint STM_GCC_FK_CAR 
        foreign key (GCC_CODCAR) 
        references STM_CARTO;

    alter table STM_GCACAR 
        add constraint STM_GCC_FK_GCA 
        foreign key (GCC_CODGCA) 
        references STM_GRPCARTO;

    alter table STM_GRPTER 
        add constraint STM_GRT_FK_TERM 
        foreign key (GRT_CODTERM) 
        references STM_ETERRIT;

    alter table STM_GRPTER 
        add constraint STM_GRT_FK_TER 
        foreign key (GRT_CODTER) 
        references STM_ETERRIT;

    alter table STM_PARAMAPP 
        add constraint STM_PAP_FK_APP 
        foreign key (PAP_CODAPP) 
        references STM_APPS;

    alter table STM_PARAMSER 
        add constraint STM_PSE_FK_SER 
        foreign key (PSE_CODSER) 
        references STM_SERVICIO;

    alter table STM_PARAMTTA 
        add constraint STM_PTT_FK_TAR 
        foreign key (PTT_CODTAR) 
        references STM_TAREA;

    alter table STM_ROLGCA 
        add constraint STM_RGC_FK_GCA 
        foreign key (RGC_CODGCA) 
        references STM_ROLES;

    alter table STM_ROLGCA 
        add constraint STM_RGC_FK_ROL 
        foreign key (RGC_CODROL) 
        references STM_GRPCARTO;

    alter table STM_ROLTAR 
        add constraint STM_RTA_FK_T 
        foreign key (RTA_CODTAR) 
        references STM_ROLES;

    alter table STM_ROLTAR 
        add constraint STM_RTA_FK_ROL 
        foreign key (RTA_CODROL) 
        references STM_TAREA;

    alter table STM_SERVICIO 
        add constraint STM_SER_FK_CON 
        foreign key (SER_CODCON) 
        references STM_CONEXION;

    alter table STM_TAREA 
        add constraint STM_TAR_FK_CON 
        foreign key (TAR_CODCON) 
        references STM_CONEXION;

    alter table STM_TAREA 
        add constraint STM_TAR_FK_GTA 
        foreign key (TAR_CODGTA) 
        references STM_GRPTAR;

    alter table STM_TAREA 
        add constraint STM_TAR_FK_TTA 
        foreign key (TAR_CODTTA) 
        references STM_TIPOTAREA;

    alter table STM_TAREA 
        add constraint STM_TAR_FK_TUI 
        foreign key (TAR_CODTUI) 
        references STM_TAREA_UI;

    alter table STM_USUCONF 
        add constraint STM_UCF_FK_ROL 
        foreign key (UCF_CODROL) 
        references STM_ROLES 
        on delete cascade;

    alter table STM_USUCONF 
        add constraint STM_UCF_FK_TER 
        foreign key (UCF_CODTER) 
        references STM_ETERRIT 
        on delete cascade;

    alter table STM_USUCONF 
        add constraint STM_UCF_FK_USU 
        foreign key (UCF_CODUSU) 
        references STM_USUARIO;
