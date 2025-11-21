export const COORDINADORES = [
  "Directora",
  "Coordinadora Técnica",
  "Coordinador Rural Cordillera",
  "Coordinador Rural Valle",
  "Coordinador Sector 1",
  "Coordinador Sector 2",
  "Coordinador Convenios",
  "Coordinador Some",
  "Coordinador Gore",
];

export const TIPOS_BLOQUEO = [
  "Feriado Legal",
  "Permiso Administrativo",
  "Permiso Compensatorio",
  "Permiso sin goce",
  "Permiso Especial",
  "Permiso de capacitación",
  "Encomendada de Capacitación",
  "Reunión extra programática",
];

export const PROFESIONALES_POR_DISCIPLINA: Record<string, string[]> = {
  "Odontólogo": [
    "MATIAS PERALTA", "SEBASTIAN CARDENAS", "HUGO OLAVE", "ARMANDO BRAVO",
    "NICOLE CAZAUX", "COSNTANZA ARRIAGADA", "SEBASTIAN ELGUETA", "VALERIA CASTRO",
    "FRANCISCA PORTOLES", "LUCAS CASTILLO", "KARINA FLANDEZ", "JUAN PABLO MILLA",
    "CATALINA GALLARDO"
  ],
  "Médico": [
    "JUAN CASTELLANOS", "AIMEE RODRIGUEZ", "JOAQUIN RODRIGUEZ", "ROBERTO MARTINEZ",
    "JOSEFA LOPEZ", "CATALINA PARDO", "FABIAN SEPULVEDA", "RAYEN GONZALEZ GORE",
    "EMILIO FIGUEROA", "CONSTANZA CANELO", "MEDICO CECOSF NUEVO"
  ],
  "Asistente Social": [
    "CLAUDIA HUAIQUE", "RICARDO CEBALLOS", "PAMELA ROMERO"
  ],
  "Enfermero/a": [
    "ALEJANDRA GODOY", "CAMILA GODOY", "GERARDO ARCE", "YONATHAN MANSILLA",
    "ANA TORRES", "ALEJANDRA SILVA", "ROCIO ZAMBRANO", "KARLA LERMANDA",
    "DANIELA ULLOA", "KAREN AGUERO", "MARIA ELENA HIDALGO", "LORETO FERNANDEZ"
  ],
  "Kinesiólogo/a": [
    "MACARENA CACERES", "DANIELA SAN MARTIN", "KARLA VALENZUELA", "JUAN YAVAR",
    "CLAUDIO PEREZ", "MAURICIO CERNA", "JORDY OPAZO", "KATHERINE VARGAS"
  ],
  "Matrón/a": [
    "KARINA TIZNADO", "CARLA BOUTAUD", "KARINA RIOS", "STEPHANIE VAN WICJK",
    "PAMELA GONZALEZ", "FABIAN SANDOVAL", "MARIA JOSE LEIVA"
  ],
  "Psicólogo/a": [
    "KAREN ANGULO", "MARLY MARTINEZ", "CAMILA FLOREZ", "VALERIA SOLIS", "ROSARIO MANNS"
  ],
  "Nutricionista": [
    "MACARENA MELLA", "DANIELA ICETA", "GLORIA HUAIQUIPAN", "NATALIA CONCHA",
    "ARACELYS MERCHANTT", "EMILIA ANTILLANCA"
  ],
  "Educadora": [
    "JEANNETTE FARFAN"
  ],
  "Fonoaudiólogo/a": [
    "YENIFER JIMENEZ"
  ],
  "Terapeuta Ocupacional": [
    "CAMILO VERA", "SOLEDAD MORALES", "CLAUDIA LEHUEY"
  ],
  "Profesor EF": [
    "EDER ANABALON", "LEONARDO VALENZUELA"
  ],
  "Tecnólogo Médico": [
    "DANIEL VERA"
  ],
  "Químico Farmacéutico": [
    "EDUARDO BRAVO"
  ],
  "Podóloga": [
    "CLAUDIA CORVALAN", "ROCIO SANDOVAL"
  ],
  "TENS": [
    "YOCELYN SAEZ", "BEATRIZ VARGAS", "STHEPAHIE WEISER", "PAULA MANSILLA",
    "SERGIO ZAMBRANO", "PAOLA FIGUEROA", "VINKA SEPULVEDA", "GLORIA REYES",
    "JOSE MAUREIRA", "HERNAN FILCUN", "VALESKA TORRES", "LUCRECIA MANQUEL",
    "YENNIFER TORRES", "MARIANA GALLARDO", "ANDREA JAURE", "MACARENA SEPULVEDA",
    "GLORIA GONZALEZ", "ANTONIETA ESTRADA", "CARLA VEGA", "MONICA REYES",
    "VANESSA VEGA", "JAIME MARTINEZ", "DAPNER MAUREIRA", "GABRIELA ARAVENA"
  ]
};

export const DISCIPLINAS = Object.keys(PROFESIONALES_POR_DISCIPLINA);