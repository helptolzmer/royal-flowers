export interface GrupaConfig {
  zdjecia: string[];
  opis: string;
  cena: string;
}

export interface RealizacjeConfig {
  bukiety: GrupaConfig[];
  flowerbox: GrupaConfig[];
  wience: GrupaConfig[];
}

const config: RealizacjeConfig = {
  bukiety: [
    {
      zdjecia: ["IMG_0157.jpg", "IMG_0158.jpg"],
      opis: "Czerwone róże z białym misiem",
      cena: "150–200 zł",
    },
    {
      zdjecia: ["IMG_0161.jpg", "IMG_0162.jpg"],
      opis: "Różowy misiowy bukiet z gypsofilia",
      cena: "140–190 zł",
    },
    {
      zdjecia: ["IMG_0346.jpg"],
      opis: "Serce z róż i pralinkami Ferrero Rocher",
      cena: "200–280 zł",
    },
    {
      zdjecia: ["IMG_2993.jpg", "IMG_2997.jpg", "IMG_2998.jpg", "IMG_3003.jpg"],
      opis: "Kaskada 50 czerwonych róż w koszyku",
      cena: "500–800 zł",
    },
    {
      zdjecia: [
        "IMG_3071.jpg",
        "IMG_3072.jpg",
        "IMG_3073.jpg",
        "IMG_3074.jpg",
        "IMG_3075.jpg",
      ],
      opis: "Czerwone róże w świątecznym złotym opakowaniu",
      cena: "120–180 zł",
    },
    {
      zdjecia: [
        "IMG_3089.jpg",
        "IMG_3090.jpg",
        "IMG_3091.jpg",
        "IMG_3092.jpg",
        "IMG_3094.jpg",
        "IMG_3095.jpg",
        "IMG_3097.jpg",
        "IMG_3098.jpg",
        "IMG_3099.jpg",
        "IMG_3100.jpg",
        "IMG_3101.jpg",
        "IMG_3102.jpg",
        "IMG_3104.jpg",
        "IMG_3105.jpg",
        "IMG_3106.jpg",
      ],
      opis: "Zimowy bukiet z liliami, ilex i różami",
      cena: "250–400 zł",
    },
    {
      zdjecia: [
        "IMG_3293.jpg",
        "IMG_3294.jpg",
        "IMG_3296.jpg",
        "IMG_3297.jpg",
        "IMG_3298.jpg",
        "IMG_3299.jpg",
        "IMG_3300.jpg",
        "IMG_3306.jpg",
        "IMG_3309.jpg",
        "IMG_3310.jpg",
      ],
      opis: "Letni mix gerber, róż i goździków",
      cena: "150–250 zł",
    },
    {
      zdjecia: [
        "IMG_3402.jpg",
        "IMG_3403.jpg",
        "IMG_3404.jpg",
        "IMG_3405.jpg",
        "IMG_3406.jpg",
        "IMG_3407.jpg",
        "IMG_3409.jpg",
      ],
      opis: "Wiśniowe róże z jaskrami",
      cena: "180–280 zł",
    },
    {
      zdjecia: ["IMG_3552.jpg", "IMG_3553.jpg"],
      opis: "Walentynkowe róże z różową gypsofilia",
      cena: "150–220 zł",
    },
    {
      zdjecia: ["IMG_3822.jpg"],
      opis: "Słonecznikowy bukiet w kraft papierze",
      cena: "100–160 zł",
    },
    {
      zdjecia: ["IMG_3832.jpg"],
      opis: "50 czerwonych róż – klasyczna elegancja",
      cena: "400–600 zł",
    },
    {
      zdjecia: [
        "IMG_3892.jpg",
        "IMG_3893.jpg",
        "IMG_3894.jpg",
        "IMG_3895.jpg",
        "IMG_3895(1).jpg",
      ],
      opis: "Pastelowy mix z hortensją, frezją i klematis",
      cena: "200–300 zł",
    },
    {
      zdjecia: ["IMG_3897.jpg", "IMG_3898.jpg", "IMG_3899.jpg", "IMG_3900.jpg"],
      opis: "Romantyczny bukiet z kaliami i piwonią",
      cena: "250–350 zł",
    },
    {
      zdjecia: [
        "IMG_3921.jpg",
        "IMG_3922.jpg",
        "IMG_3923.jpg",
        "IMG_3924.jpg",
        "IMG_3925.jpg",
        "IMG_3926.jpg",
        "IMG_3927.jpg",
      ],
      opis: "Bogata kompozycja czerwonych róż w koszyku",
      cena: "350–500 zł",
    },
    {
      zdjecia: [
        "IMG_3935.jpg",
        "IMG_3936.jpg",
        "IMG_3939.jpg",
        "IMG_3940.jpg",
        "IMG_3945.jpg",
        "IMG_3946.jpg",
        "IMG_3947.jpg",
      ],
      opis: "Ekskluzywny mix czerwonych i pomarańczowych róż",
      cena: "280–420 zł",
    },
    {
      zdjecia: ["IMG_3961.jpg", "IMG_3963.jpg", "IMG_3964.jpg"],
      opis: "Kolorowa kompozycja premium w eleganckim pudełku",
      cena: "300–450 zł",
    },
    {
      zdjecia: [
        "IMG_3967.jpg",
        "IMG_3968.jpg",
        "IMG_3969.jpg",
        "IMG_3970.jpg",
      ],
      opis: "Letni bukiet z hortensją i mieszanką róż",
      cena: "280–420 zł",
    },
    {
      zdjecia: [
        "IMG_3972.jpg",
        "IMG_3973.jpg",
        "IMG_3975.jpg",
        "IMG_3977.jpg",
        "IMG_3978.jpg",
        "IMG_3980.jpg",
        "IMG_3981.jpg",
        "IMG_3982.jpg",
        "IMG_3983.jpg",
      ],
      opis: "Boho mix ze słonecznikiem, różami i statice",
      cena: "180–280 zł",
    },
    {
      zdjecia: [
        "IMG_3986.jpg",
        "IMG_3987.jpg",
        "IMG_3987(1).jpg",
        "IMG_3988.jpg",
      ],
      opis: "Błękitna hortensja z białą różą",
      cena: "180–260 zł",
    },
    {
      zdjecia: ["IMG_3997.jpg", "IMG_3998.jpg", "IMG_4004.jpg", "IMG_4005.jpg"],
      opis: "Czerwone róże ze słonecznikiem",
      cena: "250–380 zł",
    },
    {
      zdjecia: ["IMG_4263.jpg", "IMG_4266.jpg", "IMG_4267.jpg"],
      opis: "Klasyczne ciemnoczerwone róże",
      cena: "120–180 zł",
    },
    {
      zdjecia: [
        "IMG_4447.jpg",
        "IMG_4448.jpg",
        "IMG_4449.jpg",
        "IMG_4450.jpg",
        "IMG_4453.jpg",
        "IMG_4454.jpg",
        "IMG_4455.jpg",
        "IMG_4455(1).jpg",
      ],
      opis: "100 czerwonych róż z wstążką Royal Flowers",
      cena: "700–1200 zł",
    },
    {
      zdjecia: [
        "IMG_4562.jpg",
        "IMG_4566.jpg",
        "IMG_4566(1).jpg",
        "IMG_4571.jpg",
      ],
      opis: "Pastelowy wiosenny mix z ranunkulusem",
      cena: "150–230 zł",
    },
    {
      zdjecia: ["IMG_4597.jpg", "IMG_4598.jpg"],
      opis: "Hortensja w trzech kolorach – błękit, róż, biel",
      cena: "200–300 zł",
    },
    {
      zdjecia: ["IMG_4668.jpg"],
      opis: "Misiowy bukiet w tęczowej gypsofili",
      cena: "160–230 zł",
    },
    {
      zdjecia: [
        "IMG_4724.jpg",
        "IMG_4725.jpg",
        "IMG_4727.jpg",
        "IMG_4728.jpg",
        "IMG_4729.jpg",
        "IMG_4730.jpg",
        "IMG_4732.jpg",
        "IMG_4733.jpg",
        "IMG_4734.jpg",
      ],
      opis: "Boho bukiet w odcieniach łososia i lawendy",
      cena: "200–320 zł",
    },
    {
      zdjecia: ["IMG_4770.jpg"],
      opis: "Czerwone róże z delikatną zielenią",
      cena: "130–190 zł",
    },
    {
      zdjecia: [
        "IMG_4793.jpg",
        "IMG_4794.jpg",
        "IMG_4795.jpg",
        "IMG_4796.jpg",
        "IMG_4799.jpg",
        "IMG_4800.jpg",
        "IMG_4801.jpg",
      ],
      opis: "Białe lilie z różową gypsofilia",
      cena: "140–210 zł",
    },
    {
      zdjecia: ["IMG_4852.jpg", "IMG_4853.jpg"],
      opis: "Kolorowe róże z niebieską gypsofilia",
      cena: "180–260 zł",
    },
    {
      zdjecia: ["IMG_4899.jpg", "IMG_4900.jpg", "IMG_4903.jpg"],
      opis: "Egzotyczny mix z protea, hortensją i lilią",
      cena: "300–450 zł",
    },
    {
      zdjecia: ["IMG_4912.jpg", "IMG_4913.jpg"],
      opis: "Romantyczne róże w odcieniu mauve",
      cena: "160–240 zł",
    },
    {
      zdjecia: ["IMG_5200.jpg", "IMG_5201.jpg", "IMG_5202.jpg"],
      opis: "Różowy mix – gerbera, chryzantema, alstroemeria",
      cena: "160–240 zł",
    },
    {
      zdjecia: [
        "IMG_5313.jpg",
        "IMG_5314.jpg",
        "IMG_5315.jpg",
        "IMG_5316.jpg",
      ],
      opis: "Letni kolorowy mix z różami i frezją",
      cena: "180–280 zł",
    },
    {
      zdjecia: ["IMG_5319.jpg", "IMG_5320.jpg", "IMG_5321.jpg"],
      opis: "50 klasycznych czerwonych róż",
      cena: "350–500 zł",
    },
    {
      zdjecia: ["IMG_5344.jpg"],
      opis: "Wiosenny bukiet papuzich tulipanów",
      cena: "130–200 zł",
    },
    {
      zdjecia: ["IMG_5354.jpg", "IMG_5356.jpg", "IMG_5359.jpg"],
      opis: "Pastelowy wiosenny mix z różyczkami i santini",
      cena: "110–170 zł",
    },
    {
      zdjecia: ["IMG_5402.jpg", "IMG_5403.jpg"],
      opis: "Romantyczny bukiet z piwonią i różami",
      cena: "220–350 zł",
    },
  ],

  flowerbox: [
    {
      zdjecia: [
        "IMG_3077.jpg",
        "IMG_3078.jpg",
        "IMG_3079.jpg",
        "IMG_3080.jpg",
        "IMG_3082.jpg",
      ],
      opis: "Baby shower box z ceramiczną świnką i różami",
      cena: "200–300 zł",
    },
    {
      zdjecia: [
        "IMG_3274.jpg",
        "IMG_3275.jpg",
        "IMG_3276.jpg",
        "IMG_3277.jpg",
        "IMG_3278.jpg",
        "IMG_3279.jpg",
        "IMG_3280.jpg",
      ],
      opis: "Świąteczny box z różami, orchideą i bawełną",
      cena: "300–500 zł",
    },
    {
      zdjecia: [
        "IMG_3928.jpg",
        "IMG_3929.jpg",
        "IMG_3930.jpg",
        "IMG_3933.jpg",
        "IMG_3934.jpg",
      ],
      opis: "Letni box z czerwonymi różami i ostrożniem",
      cena: "250–380 zł",
    },
    {
      zdjecia: [
        "IMG_4497.jpg",
        "IMG_4498.jpg",
        "IMG_4499.jpg",
        "IMG_4501.jpg",
        "IMG_4502.jpg",
      ],
      opis: "Różowy okrągły box z gerberą i różami",
      cena: "180–280 zł",
    },
    {
      zdjecia: [
        "IMG_4657.jpg",
        "IMG_4658.jpg",
        "IMG_4659.jpg",
        "IMG_4660.jpg",
        "IMG_4661.jpg",
        "IMG_4662.jpg",
        "IMG_4663.jpg",
      ],
      opis: "Box Royal Flowers z misiem i piwoniowymi różami",
      cena: "250–380 zł",
    },
    {
      zdjecia: [
        "IMG_4904.jpg",
        "IMG_4905.jpg",
        "IMG_4907.jpg",
        "IMG_4908.jpg",
      ],
      opis: "Aksamitny box z hortensją, orchideą i klematis",
      cena: "280–420 zł",
    },
    {
      zdjecia: [
        "IMG_5280.jpg",
        "IMG_5281.jpg",
        "IMG_5282.jpg",
        "IMG_5283.jpg",
      ],
      opis: "Różowy box z zieloną orchideą i gerberą",
      cena: "200–300 zł",
    },
    {
      zdjecia: ["IMG_5308.jpg", "IMG_5309.jpg"],
      opis: "Jasnoróżowy box z różami i alstroemerią",
      cena: "180–260 zł",
    },
    {
      zdjecia: ["IMG_5339.jpg", "IMG_5340.jpg", "IMG_5342.jpg"],
      opis: "Różowy box z lisianthusem i goździkami",
      cena: "180–260 zł",
    },
  ],

  wience: [
    {
      zdjecia: ["IMG_4750.jpg", "IMG_4751.jpg"],
      opis: "Wieniec z fioletową hortensją i różowymi różami",
      cena: "400–600 zł",
    },
    {
      zdjecia: [
        "IMG_4887.jpg",
        "IMG_4889.jpg",
        "IMG_4890.jpg",
        "IMG_4893.jpg",
        "IMG_4894.jpg",
        "IMG_4895.jpg",
      ],
      opis: "Wiosenny wieniec w pastelach z orchideą",
      cena: "400–650 zł",
    },
    {
      zdjecia: ["IMG_5192.jpg", "IMG_5193.jpg"],
      opis: "Jesienny wieniec z anthurium, orchideą i hortensją",
      cena: "450–700 zł",
    },
    {
      zdjecia: ["IMG_5221.jpg", "IMG_5223.jpg"],
      opis: "Serce z czerwonych róż na igliwiu",
      cena: "400–600 zł",
    },
    {
      zdjecia: ["IMG_5306.jpg"],
      opis: "Premium wieniec z różami, orchideą i protea",
      cena: "600–1000 zł",
    },
    {
      zdjecia: ["IMG_5330.jpg", "IMG_5332.jpg", "IMG_5333.jpg"],
      opis: "Zimowy wieniec z anthurium, orchideą i jodłą",
      cena: "500–800 zł",
    },
    {
      zdjecia: [
        "IMG_5387.jpg",
        "IMG_5388.jpg",
        "IMG_5389.jpg",
        "IMG_5390.jpg",
        "IMG_5391.jpg",
        "IMG_5392.jpg",
        "IMG_5393.jpg",
        "IMG_5394.jpg",
      ],
      opis: "Elegancki biały wieniec z liliami i chryzantemami",
      cena: "400–650 zł",
    },
  ],
};

export default config;
