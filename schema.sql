--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.19
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

-- Started on 2020-03-30 17:45:41 +03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2183 (class 1262 OID 16619)
-- Name: yettim; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE yettim WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'tr_TR.UTF-8' LC_CTYPE = 'tr_TR.UTF-8';


ALTER DATABASE yettim OWNER TO postgres;

\connect yettim

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 10 (class 2615 OID 16795)
-- Name: api; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA api;


ALTER SCHEMA api OWNER TO postgres;

--
-- TOC entry 4 (class 3079 OID 12366)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2185 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 2 (class 3079 OID 16751)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA pg_catalog;


--
-- TOC entry 2186 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 1 (class 3079 OID 16788)
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA pg_catalog;


--
-- TOC entry 2187 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- TOC entry 3 (class 3079 OID 16740)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA pg_catalog;


--
-- TOC entry 2188 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 577 (class 1247 OID 25113)
-- Name: jwt_token; Type: TYPE; Schema: api; Owner: postgres
--

CREATE TYPE api.jwt_token AS (
	token text
);


ALTER TYPE api.jwt_token OWNER TO postgres;

--
-- TOC entry 570 (class 1247 OID 16919)
-- Name: yetki; Type: TYPE; Schema: api; Owner: postgres
--

CREATE TYPE api.yetki AS ENUM (
    'Garson',
    'Mutfak',
    'Kurye',
    'Kasa',
    'Müdür'
);


ALTER TYPE api.yetki OWNER TO postgres;

--
-- TOC entry 203 (class 1255 OID 25118)
-- Name: login(text, text); Type: FUNCTION; Schema: api; Owner: postgres
--

CREATE FUNCTION api.login(uye text, sifre text) RETURNS api.jwt_token
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare 
	v_firma name;
	v_result api.jwt_token;
	v_parts text[];
begin
	v_parts := regexp_split_to_array(uye, '@');

	select firma from api.uye 
	where api.uye.ad = v_parts[1]
	and api.uye.firma = v_parts[2]
	and api.uye.sifre = crypt(login.sifre, api.uye.sifre)
	into v_firma;
 
	if v_firma is null then
		raise invalid_password using message = 'Kullanıcı adı ve/veya şifre hatalı';
	end if;

	
	select sign(
		row_to_json(r), current_setting('app.jwt_secret')
	) as token 
	from (
		select 'yettim_web_user' as role,v_firma as firma , v_parts[1] as uye
	) r
	into v_result;
	return v_result;
end;	
$$;


ALTER FUNCTION api.login(uye text, sifre text) OWNER TO postgres;

--
-- TOC entry 202 (class 1255 OID 25115)
-- Name: login2(text, text); Type: FUNCTION; Schema: api; Owner: postgres
--

CREATE FUNCTION api.login2(uye text, sifre text) RETURNS api.jwt_token
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  _role name;
  result api.jwt_token;
begin
 

  select sign(
      row_to_json(r), 'reallyreallyreallyreallyverysafe'
    ) as token
    from (
      select  extract(epoch from now())::integer + 60*60 as exp
    ) r
    into result;
  return result;
end;
$$;


ALTER FUNCTION api.login2(uye text, sifre text) OWNER TO postgres;

--
-- TOC entry 201 (class 1255 OID 16861)
-- Name: sifrele(); Type: FUNCTION; Schema: api; Owner: postgres
--

CREATE FUNCTION api.sifrele() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	if tg_op = 'INSERT' or new.sifre <> old.sifre then
		new.sifre := crypt(new.sifre, gen_salt('bf'));		
	end if;
	return new;
end;
$$;


ALTER FUNCTION api.sifrele() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 184 (class 1259 OID 16799)
-- Name: firma; Type: TABLE; Schema: api; Owner: postgres
--

CREATE TABLE api.firma (
    firma text NOT NULL,
    unvan text NOT NULL,
    eposta text NOT NULL,
    durum character(1) DEFAULT 'A'::bpchar NOT NULL,
    yetkili text,
    telefon text,
    adres text,
    ilce text,
    il text,
    ols_trh timestamp without time zone DEFAULT now() NOT NULL,
    gnc_trh timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT firma_adres_check CHECK ((length(adres) < 100)),
    CONSTRAINT firma_eposta_check CHECK ((eposta ~* '^.+@.+\..+$'::text)),
    CONSTRAINT firma_firma_check CHECK (((length(firma) < 25) AND (firma ~* '^[\w.-]+$'::text))),
    CONSTRAINT firma_il_check CHECK ((length(il) < 50)),
    CONSTRAINT firma_ilce_check CHECK ((length(ilce) < 50)),
    CONSTRAINT firma_telefon_check CHECK ((length(telefon) < 50)),
    CONSTRAINT firma_unvan_check CHECK ((length(unvan) < 150)),
    CONSTRAINT firma_yetkili_check CHECK ((length(yetkili) < 100))
);


ALTER TABLE api.firma OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16863)
-- Name: oturum; Type: TABLE; Schema: api; Owner: postgres
--

CREATE TABLE api.oturum (
    oturum_no uuid DEFAULT uuid_generate_v4() NOT NULL,
    firma text NOT NULL,
    uye text NOT NULL,
    browser text,
    ip inet,
    miad timestamp without time zone DEFAULT (now() + '06:00:00'::interval) NOT NULL,
    CONSTRAINT oturum_uye_check CHECK ((length(uye) < 150))
);


ALTER TABLE api.oturum OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16899)
-- Name: urun; Type: TABLE; Schema: api; Owner: postgres
--

CREATE TABLE api.urun (
    firma text NOT NULL,
    urun text NOT NULL,
    aciklama text NOT NULL,
    katagori text NOT NULL,
    fiyat numeric DEFAULT 0 NOT NULL,
    miktar numeric DEFAULT 0 NOT NULL,
    stok_takip numeric DEFAULT 0 NOT NULL,
    durum numeric DEFAULT 0 NOT NULL,
    ols_trh timestamp without time zone DEFAULT now() NOT NULL,
    gnc_trh timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE api.urun OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16929)
-- Name: uye; Type: TABLE; Schema: api; Owner: postgres
--

CREATE TABLE api.uye (
    firma text NOT NULL,
    ad text NOT NULL,
    soyad text NOT NULL,
    sifre text NOT NULL,
    telefon text NOT NULL,
    eposta text,
    yetki api.yetki DEFAULT 'Garson'::api.yetki,
    durum character(1) DEFAULT 'A'::bpchar NOT NULL,
    ols_trh timestamp without time zone DEFAULT now() NOT NULL,
    gnc_trh timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT uye_ad_check CHECK ((length(ad) < 75)),
    CONSTRAINT uye_eposta_check CHECK ((eposta ~* '^.+@.+\..+$'::text)),
    CONSTRAINT uye_sifre_check CHECK ((length(sifre) < 512)),
    CONSTRAINT uye_soyad_check CHECK ((length(soyad) < 75))
);


ALTER TABLE api.uye OWNER TO postgres;

--
-- TOC entry 2174 (class 0 OID 16799)
-- Dependencies: 184
-- Data for Name: firma; Type: TABLE DATA; Schema: api; Owner: postgres
--

COPY api.firma (firma, unvan, eposta, durum, yetkili, telefon, adres, ilce, il, ols_trh, gnc_trh) FROM stdin;
BTY	BEYKOZ TALEBE YURDU	info@bty.com	A	Hikmet Akgün	\N	\N	\N	\N	2020-01-25 15:35:40.771961	2020-01-25 15:35:40.771961
\.


--
-- TOC entry 2175 (class 0 OID 16863)
-- Dependencies: 185
-- Data for Name: oturum; Type: TABLE DATA; Schema: api; Owner: postgres
--

COPY api.oturum (oturum_no, firma, uye, browser, ip, miad) FROM stdin;
\.


--
-- TOC entry 2176 (class 0 OID 16899)
-- Dependencies: 186
-- Data for Name: urun; Type: TABLE DATA; Schema: api; Owner: postgres
--

COPY api.urun (firma, urun, aciklama, katagori, fiyat, miktar, stok_takip, durum, ols_trh, gnc_trh) FROM stdin;
BTY	ADANA	ACILI ADANA DURUM	Kebaplar	13	10	0	0	2020-01-25 17:56:04.701887	2020-01-25 17:56:04.701887
BTY	TVKŞIŞ	TAVUK ŞİŞ	Kebaplar	13	10	0	0	2020-01-25 17:56:04.701887	2020-01-25 17:56:04.701887
BTY	Urfa	Urfa Kebap yeme	Kebaplar	15	0	0	0	2020-01-25 17:56:06.881375	2020-01-25 17:56:06.881375
\.


--
-- TOC entry 2177 (class 0 OID 16929)
-- Dependencies: 187
-- Data for Name: uye; Type: TABLE DATA; Schema: api; Owner: postgres
--

COPY api.uye (firma, ad, soyad, sifre, telefon, eposta, yetki, durum, ols_trh, gnc_trh) FROM stdin;
BTY	Mehmet	Gülsoy	$2a$06$7jk809euInAnADHI.jH3aOarilr2rKkaAvTk78Gnh.us.k9rbVAHC	5333907809	\N	Garson	A	2020-01-26 14:48:32.227047	2020-01-26 14:48:32.227047
\.


--
-- TOC entry 2046 (class 2606 OID 16817)
-- Name: firma firma_pkey; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.firma
    ADD CONSTRAINT firma_pkey PRIMARY KEY (firma);


--
-- TOC entry 2048 (class 2606 OID 16873)
-- Name: oturum oturum_pkey; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.oturum
    ADD CONSTRAINT oturum_pkey PRIMARY KEY (oturum_no);


--
-- TOC entry 2050 (class 2606 OID 16912)
-- Name: urun urun_pkey; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.urun
    ADD CONSTRAINT urun_pkey PRIMARY KEY (firma, urun);


--
-- TOC entry 2052 (class 2606 OID 16948)
-- Name: uye uye_eposta_key; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.uye
    ADD CONSTRAINT uye_eposta_key UNIQUE (eposta);


--
-- TOC entry 2054 (class 2606 OID 16944)
-- Name: uye uye_pkey; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.uye
    ADD CONSTRAINT uye_pkey PRIMARY KEY (firma, ad, soyad);


--
-- TOC entry 2056 (class 2606 OID 16946)
-- Name: uye uye_telefon_key; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.uye
    ADD CONSTRAINT uye_telefon_key UNIQUE (telefon);


--
-- TOC entry 2059 (class 2620 OID 16954)
-- Name: uye sifrele; Type: TRIGGER; Schema: api; Owner: postgres
--

CREATE TRIGGER sifrele BEFORE INSERT OR UPDATE ON api.uye FOR EACH ROW EXECUTE PROCEDURE api.sifrele();


--
-- TOC entry 2057 (class 2606 OID 16913)
-- Name: urun urun_firma_fkey; Type: FK CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.urun
    ADD CONSTRAINT urun_firma_fkey FOREIGN KEY (firma) REFERENCES api.firma(firma);


--
-- TOC entry 2058 (class 2606 OID 16949)
-- Name: uye uye_firma_fkey; Type: FK CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.uye
    ADD CONSTRAINT uye_firma_fkey FOREIGN KEY (firma) REFERENCES api.firma(firma);


--
-- TOC entry 2184 (class 0 OID 0)
-- Dependencies: 10
-- Name: SCHEMA api; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA api FROM PUBLIC;
REVOKE ALL ON SCHEMA api FROM postgres;
GRANT ALL ON SCHEMA api TO postgres;
GRANT USAGE ON SCHEMA api TO yettim_web_user;


--
-- TOC entry 2189 (class 0 OID 0)
-- Dependencies: 203
-- Name: FUNCTION login(uye text, sifre text); Type: ACL; Schema: api; Owner: postgres
--

REVOKE ALL ON FUNCTION api.login(uye text, sifre text) FROM PUBLIC;
REVOKE ALL ON FUNCTION api.login(uye text, sifre text) FROM postgres;
GRANT ALL ON FUNCTION api.login(uye text, sifre text) TO postgres;
GRANT ALL ON FUNCTION api.login(uye text, sifre text) TO PUBLIC;
GRANT ALL ON FUNCTION api.login(uye text, sifre text) TO web_anon;


--
-- TOC entry 2190 (class 0 OID 0)
-- Dependencies: 184
-- Name: TABLE firma; Type: ACL; Schema: api; Owner: postgres
--

REVOKE ALL ON TABLE api.firma FROM PUBLIC;
REVOKE ALL ON TABLE api.firma FROM postgres;
GRANT ALL ON TABLE api.firma TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE api.firma TO yettim_web_user;


--
-- TOC entry 2191 (class 0 OID 0)
-- Dependencies: 185
-- Name: TABLE oturum; Type: ACL; Schema: api; Owner: postgres
--

REVOKE ALL ON TABLE api.oturum FROM PUBLIC;
REVOKE ALL ON TABLE api.oturum FROM postgres;
GRANT ALL ON TABLE api.oturum TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE api.oturum TO yettim_web_user;


--
-- TOC entry 2192 (class 0 OID 0)
-- Dependencies: 186
-- Name: TABLE urun; Type: ACL; Schema: api; Owner: postgres
--

REVOKE ALL ON TABLE api.urun FROM PUBLIC;
REVOKE ALL ON TABLE api.urun FROM postgres;
GRANT ALL ON TABLE api.urun TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE api.urun TO yettim_web_user;


--
-- TOC entry 2193 (class 0 OID 0)
-- Dependencies: 187
-- Name: TABLE uye; Type: ACL; Schema: api; Owner: postgres
--

REVOKE ALL ON TABLE api.uye FROM PUBLIC;
REVOKE ALL ON TABLE api.uye FROM postgres;
GRANT ALL ON TABLE api.uye TO postgres;
GRANT SELECT,INSERT,UPDATE ON TABLE api.uye TO yettim_web_user;


-- Completed on 2020-03-30 17:45:42 +03

--
-- PostgreSQL database dump complete
--

