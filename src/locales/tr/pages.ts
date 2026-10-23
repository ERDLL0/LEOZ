const pages = {
  barbers: {
    label: 'ZANAATIN ARKASINDAKİ İNSANLAR',
    title: 'Sıradaki berberinizle tanışın.',
    text: 'Bir sohbet. Taze bir bakış. Size ait bir görünüm.',
    headingLines: ['Her iyi görünümün', 'arkasında bir insan var.'],
    copy: 'Ekip tanıtımları hazırlanıyor. İsimler, portreler ve şube bilgileri onaydan sonra burada olacak.',
    cardLabel: 'Profil onay bekliyor',
    cardLine: 'Portre ve biyografi eklenecek',
    note: 'Konsept portre alanı · Personel kimliği, onaylanana kadar gösterilmez.',
  },
  ritual: {
    label: 'LEOZ RİTÜELİ',
    title: 'Danışma. Ustalık. Final.',
    text: 'İlk sohbetten son detaya kadar özenli bir yaklaşım.',
  },
  pride: {
    label: 'AİT OLUNACAK BİR YER',
    title: 'The Pride Club.',
    text: 'Leoz deneyimine daha yakın bir bağ.',
    eyebrow: 'SIRADAKİ BÖLÜM',
    headingLines: ['Bazı şeyler', 'ait olmaya değer.'],
    copy: 'Kulüp şekilleniyor. Üyelik detayları ve ayrıcalıklar onaylandığında paylaşılacak.',
    interest:
      'İlgi listesi henüz açık değil. Hiçbir kişisel bilgi toplanmadı. Onaylı program için tekrar bakın.',
  },
  about: {
    label: 'MEKÂNA HOŞ GELDİNİZ',
    title: 'Daha yüksek bir standart.',
    text: 'İlk sohbetten son detaya kadar özenli bir yaklaşım.',
    paragraphs: [
      'Leoz Gents Salon, erkek bakımına dair düşünülmüş ve modern yaklaşımını Dubai’nin iki ayrı atmosferine taşıyor.',
      'Palm Jumeirah’ta sıcak dokular ve aceleye kapılmayan bir hizmet. DIFC / Sky Gardens’ta daha keskin, mimari bir ritim.',
      'Bu önizlemedeki görseller geçici konsept çalışmalardır. Yayına girmeden önce yerlerini özgün fotoğraflar ve onaylı marka hikâyesi alacaktır.',
    ],
  },
  contact: {
    label: 'MEKÂNINIZI BULUN',
    title: 'Bunu kişisel kılalım.',
    text: 'Palm Jumeirah ya da DIFC. Şubenizle başlayın.',
  },
  book: {
    label: 'YENİ BÖLÜMÜNÜZ BURADA BAŞLIYOR',
    title: 'Koltuğunuzu ayırtın.',
    text: 'İki konum. Tek özenli deneyim. Leoz’unuzu seçin.',
    notice: 'Randevu, onaylı Leoz randevu adresinde devam eder. Nihai detayları şubeyle doğrulayın.',
  },
  journal: {
    label: 'MEKÂNDAN NOTLAR',
    title: 'Düşünülmüş bir hayat.',
    text: 'Bakım, kişisel stil ve kendinize zaman ayırmak üzerine sohbetler.',
    draftTag: 'EDİTORYAL TASLAK',
    readArticle: 'Notu okuyun',
    articles: [
      {
        slug: 'a-better-barber-consultation',
        category: 'DETAYLAR',
        title: 'İyi bir kesim bir sohbetle başlar.',
        body: [
          'Yanınızda bir referans getirin; ama rutininizi de getirin. Saçınızı sıradan bir sabahta nasıl taşıdığınız, olmasını istediğiniz hâlin fotoğrafı kadar değerlidir.',
          'Neyi korumak, neyi değiştirmek istediğinizi ve şekillendirmeye ne kadar zaman ayırabileceğinizi konuşun. Net bir sohbet, berberinize iyi bir başlangıç noktası verir.',
          'Ayrılmadan önce, görünümü nasıl yeniden elde edeceğinizi sorun. Doğru sorular, bir sonraki randevunuzu daha özenli kılar.',
        ],
      },
      {
        slug: 'make-time-for-yourself',
        category: 'RİTÜEL',
        title: 'Kendinize zaman ayırma sanatı.',
        body: [
          'Bir bakım randevusu, yoğun bir günün küçük bir molası olabilir. Takviminize, dikkatinizi hak eden her şeyle aynı niyetle ekleyin.',
          'Gelmeden önce ziyaretten ne istediğinizi düşünün. Basit bir tazeleme ve tümden bir değişim farklı sohbetlerle başlar.',
          'Görünümünüze ve rutininize uyan bir ritim seçin. Süreklilik, zaman ayırabildiğiniz bir şeyle başlar.',
        ],
      },
      {
        slug: 'two-sides-of-dubai',
        category: 'ŞEHİR',
        title: 'Tek şehir. İki farklı ritim.',
        body: [
          'Palm Jumeirah ve DIFC, Leoz deneyimine iki ayrı atmosfer kazandırır. Palm’ın yaratıcı yönü sıcak ve aceleye kapılmayan bir tondadır; DIFC ise daha mimari ve odaklı bir havaya bürünür.',
          'Tercih ettiğiniz atmosferi bulmak için konum sayfalarını inceleyin. Ziyaretinizi planlamadan önce onaylı şube bilgilerini ve randevu seçeneklerini doğrulayın.',
        ],
      },
    ],
  },
  legal: {
    privacy: {
      label: 'ÖNİZLEME BİLGİLERİ',
      title: 'Gizliliğiniz.',
      paragraphs: [
        'Bu web sitesi bir tasarım önizlemesidir. Randevu, ödeme veya üyelik kaydı oluşturamaz.',
        'Dil tercihiniz ve seçtiğiniz şube bu tarayıcıda saklanır. İsteğe bağlı analitik izni yerel olarak tutulur. Bağlı bir harici analitik sağlayıcı yoktur.',
        'İşletme tarafından onaylanmış gizlilik ve çerez politikaları, yayına girmeden önce bu önizleme notunun yerini almalıdır.',
      ],
      settings: 'Gizlilik tercihleri',
    },
    terms: {
      label: 'ÖNİZLEME BİLGİLERİ',
      title: 'Kullanım koşulları.',
      paragraphs: [
        'Bu web sitesi Leoz Gents Salon için bir tasarım önizlemesidir. Bir teklif niteliği taşımaz; kullanımıyla hiçbir randevu, ödeme veya üyelik oluşmaz.',
        'Hizmet adları, fiyatlar ve görseller örnek niteliğindedir ya da nihai onayı beklemektedir. Gösterilen fiyatlar yayınlanmış Leoz fiyat listesinden alınmıştır (Şubat 2025) ve değişebilir.',
        'İşletme tarafından onaylanmış koşullar, yayına girmeden önce bu önizleme notunun yerini almalıdır.',
      ],
      settings: 'Gizlilik tercihleri',
    },
  },
};

export default pages;
