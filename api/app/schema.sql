DROP TABLE IF EXISTS uye;
CREATE TABLE uye (
  no INTEGER PRIMARY KEY,
  firma TEXT  NOT NULL,
  uye TEXT  NOT NULL,
  sifre TEXT NOT NULL,
  gorev TEXT,
  yetki TEXT NOT NULL,
  durum TEXT NOT NULL DEFAULT 'A',
  ols_trh TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP  
);
CREATE UNIQUE INDEX idx_firma_uye ON uye (firma,uye);

INSERT INTO uye (no,firma,uye,sifre,gorev,yetki) VALUES        
                (null, 'bty', 'mehmet', '$2b$12$GK3Dv0aApEg39erF4WQ1kuzkIn4qeLoobXjbIBVX4lXeoPKdsc8kO','GARSON','ADMIN'),
                (null, 'bty', 'metin', '$2b$12$GK3Dv0aApEg39erF4WQ1kuzkIn4qeLoobXjbIBVX4lXeoPKdsc8kO','MUHASİP','ADMIN'),
                (null,'öty','mehmet','$2b$12$GK3Dv0aApEg39erF4WQ1kuzkIn4qeLoobXjbIBVX4lXeoPKdsc8kO','GARSON','ADMIN');    

DROP TABLE IF EXISTS firma;
CREATE TABLE firma (  
  firma TEXT  PRIMARY KEY,
  unvan TEXT  NOT NULL,
  sip_no INTEGER NOT NULL DEFAULT '1',
  sip_no_trh TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  telefon TEXT,
  eposta TEXT ,
  durum text NOT NULL DEFAULT 'A',
  ols_trh TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO firma (firma,unvan,telefon,eposta) VALUES 
  ('bty', 'BEYKOZ TALEBE YURDU', '02164333009','info@bty.com'),
  ('oty', 'RIVA TALEBE YURDU', '02164333008','info@rty.com');

DROP TABLE IF EXISTS firma_data;
CREATE TABLE firma_data (  
  firma TEXT  NOT NULL,
  anahtar TEXT  NOT NULL,
  deger TEXT NOT NULL,
  gnc_trh TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ols_trh TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(firma,anahtar)
);
insert into firma_data (firma,anahtar,deger) VALUES 
  ('bty','menu_katagori','Çorbalar,Ara Sıcaklar,İkramlarımız,Dönerler,Kebaplar,Pideler,Tatlılar,İçecekler');

DROP TABLE IF EXISTS urun;
CREATE TABLE urun (   
  firma TEXT  NOT NULL,
  urun TEXT  NOT NULL,  
  aciklama TEXT NOT NULL,
  katagori TEXT NOT NULL,
  fiyat NUMERIC NOT NULL DEFAULT 0,
  miktar NUMERIC NOT NULL DEFAULT 0, 
  stok_takip NUMERIC NOT NULL DEFAULT 0,
  durum NUMERIC NOT NULL DEFAULT 0,
  ols_trh TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(firma,urun)  
);
INSERT INTO urun (firma,urun,aciklama,fiyat,miktar,katagori) VALUES 
                  ('BTY', 'ADANA', 'ACILI ADANA DURUM',13,10,'Kebaplar'),
                  ('BTY', 'TVKŞIŞ', 'TAVUK ŞİŞ',13,10,'Kebaplar');

INSERT INTO "URUN" (firma,urun,aciklama,katagori,fiyat,miktar,stok_takip,durum) VALUES 
                  ('bty','Urfa','Urfa Kebap yeme','Kebaplar',15,0,0,0);


DROP TABLE IF EXISTS siparis;
CREATE TABLE siparis (
  firma TEXT  NOT NULL,
  siparis TEXT  NOT NULL,
  satir TEXT  NOT NULL,
  durum INTEGER NOT NULL DEFAULT 0, 
  urun TEXT  NOT NULL,
  orj_mkt NUMERIC NOT NULL DEFAULT 0,
  gnc_mkt NUMERIC NOT NULL DEFAULT 0, 
  fiyat NUMERIC NOT NULL DEFAULT 0,
  ols_trh TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(firma,siparis,satir) 
);
INSERT INTO siparis (firma,siparis,satir,urun,orj_mkt,gnc_mkt,fiyat) VALUES 
  ('BTY2','1','1', 'ADANA', 5, 5,13),
  ('BTY','1','2', 'TAVUK ŞİŞ', 3, 2,10);
