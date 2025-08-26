## Angular Öğrenme Projeleri Koleksiyonu

Bu depo, Angular ile öğrenme sürecinizde adım adım ilerlemeniz için hazırlanmış küçük ve odaklı örnek projeler içerir. Her klasör bağımsız bir Angular uygulamasıdır ve spesifik bir konuyu/prensibi demonstre eder: bileşenler, yaşam döngüsü, iki yönlü bağlama, direktifler, pipe'lar, servisler, değişiklik algılama, RxJS, HTTP, formlar ve routing.

### İçindekiler
- **Gereksinimler ve Kurulum**
  - [Sistem gereksinimleri](#sistem-gereksinimleri)
  - [Ortam kurulumu](#ortam-kurulumu)
  - [Projeleri çalıştırma](#projeleri-çalıştırma)
  - [12-http backend çalıştırma](#12-http-backend-çalıştırma)
- **Projeler (Klasörler)**
  - [01-starting-project](#01-starting-project)
  - [02-investment-project](#02-investment-project)
  - [03-debugging](#03-debugging)
  - [04-components](#04-components)
  - [05-lifecycles](#05-lifecycles)
  - [06-custom-two-way-binding](#06-custom-two-way-binding)
  - [07-directives](#07-directives)
  - [08-pipes](#08-pipes)
  - [09-services](#09-services)
  - [10-change-detection](#10-change-detection)
  - [11-rxjs](#11-rxjs)
  - [12-http](#12-http)
  - [13-forms](#13-forms)
  - [14-routing](#14-routing)

---

### Sistem gereksinimleri
- Node.js 18 LTS veya 20+ (LTS önerilir)
- npm 9+ veya pnpm/yarn (örneklerde npm varsayılmıştır)
- Angular CLI (global): `npm i -g @angular/cli`

### Ortam kurulumu
1. Depoyu klonlayın:
   ```bash
   git clone <repo-url>
   cd Angular
   ```
2. Her proje klasörü bağımsız bir Angular uygulamasıdır. Çalıştırmak istediğiniz klasöre girip bağımlılıkları kurun:
   ```bash
   cd 04-components
   npm install
   ```

### Projeleri çalıştırma
- Girdiğiniz proje klasöründe geliştirme sunucusunu başlatın:
  ```bash
  npm start
  # veya
  ng serve
  ```
- Varsayılan olarak `http://localhost:4200` adresinde çalışır.

### 12-http backend çalıştırma
`12-http` projesi yerel bir Node/Express backend ile birlikte gelir.

1. Backend'i başlatın:
   ```bash
   cd 12-http/backend
   npm install
   npm start
   ```
   Bu adım, örnek veri ve görselleri sunan API'yi başlatır.

2. Frontend'i başlatın (ayrı bir terminalde):
   ```bash
   cd 12-http
   npm install
   npm start
   ```

---

## Proje özetleri

### 01-starting-project
- Basit bir görev yönetimi/örnek uygulama iskeleti.
- Öne çıkanlar: `header`, `user`, `tasks` bileşenleri ve `shared/card` gibi yeniden kullanılabilir bileşen yapısı.
- Amaç: Angular bileşen mimarisine giriş, temel veri akışı ve stillendirme.

### 02-investment-project
- Kullanıcı girdisine dayalı yatırım getirisi hesaplama örneği.
- Öne çıkanlar: `user-input` ve `investment-results` bileşenleri, `investment.service.ts` ile hesaplama/iş mantığı ayrımı.
- Amaç: Bileşenler arası iletişim ve servis ile iş mantığının taşınması.

### 03-debugging
- Debugging yaklaşım ve tekniklerini göstermek için hazırlanmış sürüm.
- Öne çıkanlar: Aynı temel görev uygulamasında hata ayıklama senaryoları ve geliştirme ipuçları.
- Amaç: Hata ayıklama, template ve TypeScript tarafında sorun tespiti.

### 04-components
- Bileşen mimarisi, girdi/çıktı bağları ve yeniden kullanılabilir parçalara odaklı bir dashboard.
- Öne çıkanlar:
  - `dashboard/*`: `dashboard-item`, `server-status`, `tickets`, `traffic`
  - `shared/*`: `button` ve `control` gibi tekrar kullanılabilir UI bileşenleri
- Amaç: Bileşen kompozisyonu, input/output ile veri ve olay yönetimi.

### 05-lifecycles
- Angular bileşen yaşam döngüsü kancalarını (ngOnInit, ngOnChanges vb.) demonstre eder.
- Öne çıkanlar: `lifecycle` bileşeni ile çeşitli lifecycle hook'larının davranışı.
- Amaç: Lifecycle anlayışı ve hook'larla yan etkilerin yönetimi.

### 06-custom-two-way-binding
- Özel iki yönlü bağlama deseni ([(...)]) üzerine odaklanır.
- Öne çıkanlar: `rect` bileşeni ile değer ve `...Change` olayı kombinasyonu.
- Amaç: Özel iki yönlü bağ kuralları ve API tasarımı.

### 07-directives
- Yapısal ve öznitelik direktiflerine giriş, örnek uygulama.
- Öne çıkanlar: `auth`, `learning-resources` ve custom directive örnekleri.
- Amaç: Şablon manipülasyonu, koşullu render ve stil davranışlarının direktiflerle yönetimi.

### 08-pipes
- Pipe kullanımı ve özelleştirme.
- Öne çıkanlar: `sort.pipe.ts` ve formatlama/dönüşüm senaryoları.
- Amaç: Sunum katmanında veri dönüşümü ve sıralama gibi işlemler.

### 09-services
- Servisler, bağımlılık enjeksiyonu ve birlikte çalışma.
- Öne çıkanlar: `logging.service.ts`, `tasks` modülü, `task.model.ts`, `tasks-list` bileşenleri.
- Amaç: Durumun servisle paylaşımı ve komponentler arası iletişim.

### 10-change-detection
- Angular değişiklik algılama stratejileri ve performans etkileri.
- Öne çıkanlar: `counter`, `info-message`, `messages` örnekleri.
- Amaç: OnPush ve varsayılan stratejinin etkilerini gözlemlemek.

### 11-rxjs
- Temel RxJS kullanımı ve reaktif programlama konseptleri.
- Öne çıkanlar: `app.component` üzerinde Observable/Subscription örnekleri.
- Amaç: Akış tabanlı düşünme ve RxJS operatörlerine giriş.

### 12-http
- HTTP istekleri, veri alma/gönderme ve hata yönetimi.
- Öne çıkanlar:
  - Backend: `backend/app.js`, `data` ve `images` dizinleri ile örnek API
  - Frontend: `places` modülü ve `shared` yardımcıları
- Amaç: HttpClient ile REST etkileşimi, loading/hata durumları ve yanıtların işlenmesi.

### 13-forms
- Formlar: Template-driven ve (varsa) Reactive formlar.
- Öne çıkanlar: `auth` alanı altında form örnekleri ve doğrulamalar.
- Amaç: Form kontrolü, validasyon ve kullanıcı geri bildirimi yönetimi.

### 14-routing
- Uygulama yönlendirmesi (routing), parametreler, koruyucular ve 404 sayfası.
- Öne çıkanlar: `users`, `tasks`, `not-found` modülleri ve `dummy-users.ts` ile örnek veri.
- Amaç: Router yapılandırması, parametreli rotalar ve fallback/404 yönetimi.

---

## Faydalı komutlar
```bash
# Yeni bileşen oluşturma
ng generate component my-component

# Yeni servis oluşturma
ng generate service my-service

# Build alma (production)
ng build --configuration production

# Birim testleri (eğer eklendiyse)
ng test
```

## Notlar
- Her proje, kendi `angular.json`, `package.json` ve `src/` dizini ile izole çalışır.
- Ortak görseller `public/` veya `assets/` dizinlerinde yer alır.
- Port çakışmalarında `ng serve --port 4201` gibi alternatif port kullanabilirsiniz.

