# StudyMate Geliştirme Kuralları

## Branch Yapısı

`main` branch projenin ana ve stabil sürümüdür.

Ekip üyeleri geliştirmelerini doğrudan `main` branch üzerinde yapmamalıdır.

Her görev için ayrı bir branch oluşturulmalıdır.

### Branch İsimlendirme

Branch isimleri görev türüne göre oluşturulur:

- `feature/...` → Yeni özellik geliştirme
- `fix/...` → Hata düzeltme
- `integration/...` → Entegrasyon çalışmaları
- `docs/...` → Dokümantasyon değişiklikleri

Örnek:

```text
feature/mobile-courses
feature/backend-auth
fix/matching-error
integration/mobile-backend
