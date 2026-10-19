# StudyMate

StudyMate, üniversite öğrencilerinin ders ve çalışma ihtiyaçlarına uygun çalışma arkadaşları bulmasını sağlayan mobil tabanlı bir çalışma platformudur.

Projenin ilk aşamasında Fırat Üniversitesi Bilgisayar Mühendisliği öğrencileri hedeflenmektedir. Sistem; öğrencilerin ders, seviye, kaynak ve çalışma tercihlerini değerlendirerek uygun çalışma arkadaşlarıyla eşleşmesini amaçlamaktadır.

## Projenin Amacı

Öğrencilerin birlikte çalışabilecekleri uygun kişileri daha kolay bulmasını sağlamak ve ortak çalışma sürecini tek bir platform üzerinden yönetmek.

StudyMate ile kullanıcılar:

- Bölüm ve sınıf bilgilerini belirleyebilir.
- Derslerini seçebilir.
- Çalışma seviyelerini ve tercihlerini belirleyebilir.
- Sahip olduğu ve ihtiyaç duyduğu kaynakları belirtebilir.
- Uygun çalışma arkadaşlarıyla otomatik olarak eşleşebilir.
- Çalışma oturumları oluşturabilir.
- Kaynak ve mesaj paylaşımı gerçekleştirebilir.
- Çalışma sonrasında değerlendirme yapabilir.

## Temel Özellikler

### Kullanıcı ve Profil
- Kullanıcı kayıt ve giriş işlemleri
- Bölüm ve sınıf bilgileri
- Ders bilgileri
- Kullanıcı profili

### Ders ve Eşleşme
- Bölüm, sınıf ve ders seçimi
- Çalışma talebi oluşturma
- Seviye ve çalışma tercihlerinin belirlenmesi
- Kaynak ihtiyaçlarının belirlenmesi
- Uygun kullanıcıların eşleştirilmesi
- Uyumluluk yüzdesinin gösterilmesi

### Çalışma Oturumu
- Eşleşme sonrası çalışma oturumu başlatma
- 20 dakikalık ücretsiz çalışma oturumu
- Günlük ücretsiz kullanım sınırı
- Grup çalışma desteği
- Premium özellikler için altyapı

### Kullanıcı Değerlendirme ve Güven Sistemi
- Çalışma oturumu tamamlandıktan sonra kullanıcıların birbirini değerlendirmesi
- İletişim, güvenilirlik, kaynak paylaşımı ve çalışma uyumu üzerinden puanlama
- Kullanıcı puanlarının sonraki eşleşmelerde güvenilirlik kriteri olarak kullanılması
- Olumsuz değerlendirmeler ve düşük güven puanlarının sistem tarafından dikkate alınması

### İletişim ve Kaynak Paylaşımı
- Mesajlaşma
- PDF ve görsel kaynak paylaşımı
- Ders kaynaklarının paylaşılması

## Eşleşme Sistemi
İlk aşamada eşleşme sistemi kural tabanlı bir puanlama yaklaşımı kullanacaktır.
Uyumluluk hesabında aşağıdaki kriterler değerlendirilecektir:

- Ders uyumu: %30
- Seviye uyumu: %20
- Kaynak tamamlayıcılığı: %20
- Çalışma tercihi: %15
- Güvenilirlik ve değerlendirme: %15

Bu yapı ilerleyen aşamalarda geliştirilebilir.

## Teknolojiler

### Mobil
- React Native
- Expo
- TypeScript

### Backend
- Node.js
- Express.js
- REST API
- JWT

### Veritabanı
- PostgreSQL

### Proje Yönetimi
- Git
- GitHub
- GitHub Issues
- GitHub Projects

## Proje Yapısı

StudyMate, mobil uygulama, backend ve veritabanı olmak üzere temel modüllerden oluşmaktadır.

Mobil uygulama:
- Kullanıcı ve profil
- Ders ve eşleşme
- Çalışma oturumu
- İletişim ve kaynak paylaşımı

Backend:
- Kullanıcı işlemleri
- Ders işlemleri
- Eşleşme servisleri
- Çalışma oturumu servisleri
- İletişim ve kaynak servisleri

Veritabanı:
- Kullanıcı ve profil verileri
- Bölüm, sınıf ve ders bilgileri
- Eşleşme ve oturum bilgileri
- Kaynak ve değerlendirme bilgileri

## Ekip Görev Dağılımı

| Ekip Üyesi | Görev |
|---|---|
| Buğra | Proje ve Entegrasyon Yönetimi |
| Esma | Mobil Kullanıcı ve Profil |
| Sude | Mobil Ders ve Eşleşme |
| Onur | Backend ve API Servisleri |
| Rana | Veritabanı Yönetimi |
| Firdevs | Eşleşme ve Çalışma Oturumu |
| Beyza | İletişim ve Kaynak Paylaşımı |

## Proje Yönetimi

Geliştirme sürecinde GitHub kullanılmaktadır.

Görev takibi için GitHub Issues ve GitHub Projects kullanılacaktır. Modüllerin geliştirilmesi sonrasında mobil uygulama, backend ve veritabanı bileşenlerinin birbiriyle uyumlu şekilde entegre edilmesi hedeflenmektedir.

Proje geliştirme sürecinde görevlerin kontrol edilmesi, entegrasyonların takip edilmesi, testlerin koordinasyonu ve sürüm yönetimi proje yönetimi kapsamında yürütülecektir.

## Proje Durumu

Proje geliştirme aşamasındadır.

İlk aşamada temel proje yapısı ve görev dağılımı oluşturulmuş, geliştirme süreçleri modüllere ayrılmıştır.

İlerleyen aşamalarda modüllerin geliştirilmesi, API bağlantılarının kurulması, veritabanı entegrasyonu, eşleşme sisteminin gerçek verilerle çalıştırılması ve genel sistem testlerinin gerçekleştirilmesi planlanmaktadır.

## Not

StudyMate eğitim ve proje geliştirme amacıyla hazırlanan bir demo uygulamasıdır. Gerçek ödeme sistemi ve mağaza yayını bu proje kapsamında zorunlu değildir.
