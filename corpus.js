const CORPUS = new Map([
  ["code", {code:"code",name:"Food Code",tags:"id tag legend"}],
  ["name", {code:"name",name:"Food Name",tags:"title label"}],
  ["scie", {code:"scie",name:"Scientific Name",tags:"binomial genus botanical"}],
  ["lang", {code:"lang",name:"Local Name",tags:"colloquial trivial country farmer popular"}],
  ["grup", {code:"grup",name:"Food Group",tags:"category class classification grouping type sort kind"}],
  ["regn", {code:"regn",name:"No. of Regions",tags:"number"}],
  ["water", {code:"water",name:"Moisture",tags:"liquid steam vapour proximate"}],
  ["protcnt", {code:"protcnt",name:"Protein",tags:"essential macronutrient proximate"}],
  ["ash", {code:"ash",name:"Ash",tags:"total sum metal oxide mineral inorganic element residue proximate"}],
  ["fatce", {code:"fatce",name:"Total Fat",tags:"sum triglyceride lipid blubber essential macronutrient"}],
  ["fibtg", {code:"fibtg",name:"Total Dietary Fiber",tags:"sum fibre roughage bulk indigestible"}],
  ["fibins", {code:"fibins",name:"Insoluble Dietary Fiber",tags:"fibre roughage bulk indigestible"}],
  ["fibsol", {code:"fibsol",name:"Soluble Dietary Fiber",tags:"fibre roughage bulk indigestible"}],
  ["choavldf", {code:"choavldf",name:"Carbohydrate",tags:"total sum cho saccharide ose glucide hydrate carbon macronutrient proximate"}],
  ["enerc", {code:"enerc",name:"Energy",tags:"atp calorie metabolism essential proximate"}],
  ["thia", {code:"thia",name:"Thiamine (B1)",tags:"thiamin aneurine vitamin b1 b 1 water soluble essential"}],
  ["ribf", {code:"ribf",name:"Riboflavin (B2)",tags:"vactochrome lactoflavin vitamin b2 b 2 water soluble g essential"}],
  ["nia", {code:"nia",name:"Niacin (B3)",tags:"nicotinic acid nicotinamide bionic vitamin b3 b 3 pp water soluble essential white translucent crystalline crystal"}],
  ["pantac", {code:"pantac",name:"Pantothenic acid (B5)",tags:"pantothenate vitamin b5 b 5 water soluble essential yellow oil colorless crystalline crystal"}],
  ["vitb6c", {code:"vitb6c",name:"Total B6",tags:"pn p5p pl plp pm pmp pa pyridoxine pyridoxal pyridoxamine pyridoxic acid pyritinol vitamer vitamin b6 b 6 water soluble essential"}],
  ["biot", {code:"biot",name:"Biotin (B7)",tags:"biopeiderm vitamin b7 b 7 h coenzyme r water soluble essential white crystalline crystal needle"}],
  ["folsum", {code:"folsum",name:"Total Folates (B9)",tags:"pteroyl glutamic acid glutamate folic folacin vitamin b9 b 9 bc m water soluble essential"}],
  ["vitc", {code:"vitc",name:"Total Ascorbic acid",tags:"ascorbate water soluble vitamin c vitamin c essential"}],
  ["retol", {code:"retol",name:"Retinol",tags:"vitamin a1 vitamin-a 1 fat soluble essential"}],
  ["ergcal", {code:"ergcal",name:"Ergocalciferol (D2)",tags:"calciferol viosterol vitamin d2 d 2 fat soluble essential"}],
  ["chocal", {code:"chocal",name:"Cholecalciferol (D3)",tags:"activated dehydrocholesterol colecalciferol vitamin d3 d 3 fat soluble essential"}],
  ["doh25", {code:"doh25",name:"25-OH-D3",tags:"25 oh 0 calcifediol calcidiol hydroxycholecalciferol hydroxyvitamin prehormone vitamin d3 d 3 fat soluble essential"}],
  ["tocpha", {code:"tocpha",name:"α-Tocopherol",tags:"a alpha tcp vitamin e fat soluble methylated phenol antioxidant saturated phytyl essential yellow brown viscous liquid"}],
  ["tocphb", {code:"tocphb",name:"β-Tocopherol",tags:"b beta tcp vitamin e fat soluble methylated phenol antioxidant saturated phytyl essential"}],
  ["tocphg", {code:"tocphg",name:"γ-Tocopherol",tags:"g gamma tcp vitamin e fat soluble methylated phenol antioxidant saturated phytyl essential"}],
  ["tocphd", {code:"tocphd",name:"δ-Tocopherol",tags:"d delta tcp vitamin e fat soluble methylated phenol antioxidant saturated phytyl essential"}],
  ["toctra", {code:"toctra",name:"α-Tocotrienol",tags:"a alpha vitamin e fat soluble methylated phenol antioxidant unsaturated isoprenoid essential"}],
  ["toctrb", {code:"toctrb",name:"β-Tocotrienol",tags:"b beta vitamin e fat soluble methylated phenol antioxidant unsaturated isoprenoid essential"}],
  ["toctrg", {code:"toctrg",name:"γ-Tocotrienol",tags:"g gamma vitamin e fat soluble methylated phenol antioxidant unsaturated isoprenoid essential"}],
  ["toctrd", {code:"toctrd",name:"δ-Tocotrienol",tags:"d delta vitamin e fat soluble methylated phenol antioxidant unsaturated isoprenoid essential"}],
  ["vite", {code:"vite",name:"α-Tocopherol equivalent",tags:"a alpha ate te vitamin e vitamin e fat soluble methylated phenol antioxidant essential"}],
  ["vitk1", {code:"vitk1",name:"Phylloquinones (K1)",tags:"pk phytomenadione phytonadione quinone mephyton fat soluble vitamin k1 k 1 essential"}],
  ["vitk2", {code:"vitk2",name:"Menaquinones (K2)",tags:"mk menatetrenone quinone mk fat soluble vitamin k2 k 2 essential"}],
  ["lutn", {code:"lutn",name:"Lutein",tags:"xanthophyll carotenoid tetraterpenoid terpenoid isoprenoid phytochemical orange red yellow pigment crystalline crystal solid"}],
  ["zea", {code:"zea",name:"Zeaxanthin",tags:"xanthophyll carotenoid tetraterpenoid terpenoid isoprenoid phytochemical orange red yellow pigment"}],
  ["crypxb", {code:"crypxb",name:"β-Cryptoxanthin",tags:"b beta xanthophyll carotenoid tetraterpenoid terpenoid isoprenoid phytochemical yellow pigment vitamer provitamin vitamin vitamin-a cryptoxanthol caricaxanthin kryptoxanthin"}],
  ["lycpn", {code:"lycpn",name:"Lycopene",tags:"carotene carotenoid tetraterpenoid terpenoid isoprenoid phytochemical deep red orange pigment solid"}],
  ["cartg", {code:"cartg",name:"γ-Carotene",tags:"g gamma carotene carotenoid tetraterpenoid terpenoid isoprenoid phytochemical orange pigment vitamer provitamin vitamin vitamin-a"}],
  ["carta", {code:"carta",name:"α-Carotene",tags:"a alpha carotene carotenoid tetraterpenoid terpenoid isoprenoid phytochemical orange pigment vitamer provitamin vitamin vitamin-a"}],
  ["cartb", {code:"cartb",name:"β-Carotene",tags:"b beta carotene carotenoid tetraterpenoid terpenoid isoprenoid phytochemical dark red orange pigment crystalline crystal vitamer provitamin vitamin vitamin-a"}],
  ["cartoid", {code:"cartoid",name:"Total Carotenoids",tags:"carotene xanthophyll carotenoid tetraterpenoid terpenoid isoprenoid phytochemical orange yellow pigment"}],
  ["al", {code:"al",name:"Aluminium (Al)",tags:"trace post transition metal mineral chemical element"}],
  ["as", {code:"as",name:"Arsenic (As)",tags:"trace metalloid chemical element"}],
  ["cd", {code:"cd",name:"Cadmium (Cd)",tags:"trace post transition metal toxic chemical element"}],
  ["ca", {code:"ca",name:"Calcium (Ca)",tags:"quantity alkaline earth metal mineral chemical element"}],
  ["cr", {code:"cr",name:"Chromium (Cr)",tags:"trace transition metal mineral chemical element"}],
  ["co", {code:"co",name:"Cobalt (Co)",tags:"trace transition metal mineral chemical element"}],
  ["cu", {code:"cu",name:"Copper (Cu)",tags:"trace transition metal mineral chemical element"}],
  ["fe", {code:"fe",name:"Iron (Fe)",tags:"trace transition metal mineral chemical element"}],
  ["pb", {code:"pb",name:"Lead (Pb)",tags:"trace heavy post transition metal toxic chemical element"}],
  ["li", {code:"li",name:"Lithium (Li)",tags:"trace alkali metal mineral chemical element"}],
  ["mg", {code:"mg",name:"Magnesium (Mg)",tags:"quantity alkaline earth metal mineral chemical element"}],
  ["mn", {code:"mn",name:"Manganese (Mn)",tags:"trace transition metal ineral chemical element"}],
  ["hg", {code:"hg",name:"Mercury (Hg)",tags:"trace heavy liquid post transition metal toxic chemical element"}],
  ["mo", {code:"mo",name:"Molybdenum (Mo)",tags:"trace transition metal mineral chemical element"}],
  ["ni", {code:"ni",name:"Nickel (Ni)",tags:"trace transition metal mineral chemical element"}],
  ["p", {code:"p",name:"Phophorus (P)",tags:"quantity nonmetal mineral chemical element"}],
  ["k", {code:"k",name:"Potassium (K)",tags:"quantity alkali metal mineral chemical element"}],
  ["se", {code:"se",name:"Selenium (Se)",tags:"trace nonmetal mineral chemical element"}],
  ["na", {code:"na",name:"Sodium (Na)",tags:"quantity alkali metal mineral chemical element"}],
  ["zn", {code:"zn",name:"Zinc (Zn)",tags:"trace post transition mineral chemical element"}],
  ["cho", {code:"cho",name:"Total Available CHO",tags:"total sum digest absorb glucogenic carbohydrate available carbohydrate"}],
  ["starch", {code:"starch",name:"Total Starch",tags:"amylum polysaccharide polymeric carbohydrate available"}],
  ["frus", {code:"frus",name:"Fructose",tags:"simple fruit sugar levulose fructofuranose arabino hexulose ketonic monosaccharide free available carbohydrate"}],
  ["glus", {code:"glus",name:"Glucose",tags:"simple sugar blood dextrose corn grape monosaccharide white powder free available carbohydrate"}],
  ["sucs", {code:"sucs",name:"Sucrose",tags:"common table sugar saccharose disaccharide white solid free available carbohydrate"}],
  ["mals", {code:"mals",name:"Maltose",tags:"maltobiose malt sugar disaccharide white powder crystalline crystal free available carbohydrate"}],
  ["fsugar", {code:"fsugar",name:"Total Free Sugars",tags:"sum added natural sugar monosaccharide disaccharide available carbohydrate"}],
  ["lactose", {code:"lactose",name:"Lactose Content",tags:"total milk sugar disaccharide white solid free available carbohydrate"}],
  ["f4d0", {code:"f4d0",name:"Butyric acid (C4:0)",tags:"c40 c 40 4 0 bta butanoic propanecarboxylic carboxylic saturated fatty fat triglyceride lipid colorless liquid unpleasant vomit body odor"}],
  ["f6d0", {code:"f6d0",name:"Caproic acid (C6:0)",tags:"c60 c 60 6 0 hexanoic carboxylic saturated fatty fat medium chain triglyceride lipid colorless oily liquid goat like"}],
  ["f8d0", {code:"f8d0",name:"Caprylic acid (C8:0)",tags:"c80 c 80 8 0 octanoic carboxylic saturated fatty fat medium chain triglyceride lipid colorless oily liquid faint fruity irritating"}],
  ["f10d0", {code:"f10d0",name:"Capric acid (C10:0)",tags:"c100 c 100 10 0 decanoic carboxylic saturated fatty fat medium chain triglyceride lipid white crystals strong rancid and unpleasant"}],
  ["f11d0", {code:"f11d0",name:"Undecanoic acid (C11:0)",tags:"c110 c 110 11 0 undecylic carboxylic saturated fatty fat triglyceride lipid colourless crystals distinctive unpleasant odor"}],
  ["f12d0", {code:"f12d0",name:"Lauric acid (C12:0)",tags:"c120 c 120 12 0 dodecanoic dodecylic dodecoic laurostearic vulvic undecanecarboxylic duodecylic carboxylic saturated fatty fat medium chain triglyceride white powder faint odor bay oil soap"}],
  ["f14d0", {code:"f14d0",name:"Myristic acid (C14:0)",tags:"c140 c 140 14 0 tetradecanoic carboxylic saturated fatty fat triglyceride lipid"}],
  ["f15d0", {code:"f15d0",name:"Pentadecanoic acid (C15:0)",tags:"c150 c 150 15 0 pentadecylic carboxylic saturated fatty fat triglyceride lipid"}],
  ["f16d0", {code:"f16d0",name:"Palmitic acid (C16:0)",tags:"c160 c 160 16 0 hexadecanoic carboxylic saturated fatty fat triglyceride lipid white crystals"}],
  ["f18d0", {code:"f18d0",name:"Stearic acid (C18:0)",tags:"c180 c 180 18 0 octadecanoic carboxylic saturated fatty fat triglyceride lipid white solid pungent oily"}],
  ["f20d0", {code:"f20d0",name:"Arachidic acid (C20:0)",tags:"c200 c 200 20 0 eicosanoic icosanoic arachic carboxylic saturated fatty fat triglyceride lipid white crystalline crystal solid"}],
  ["f22d0", {code:"f22d0",name:"Behenic acid (C22:0)",tags:"c220 c 220 22 0 docosanoic docosanoate hydrofol carboxylic saturated fatty fat triglyceride lipid white yellow crystalline crystal powder"}],
  ["f24d0", {code:"f24d0",name:"Lignoceric acid (C24:0)",tags:"c240 c 240 24 0 tetracosanoic carboxylic saturated fatty fat triglyceride lipid"}],
  ["f14d1cn5", {code:"f14d1cn5",name:"Myristoleic acid (C14:1)",tags:"c141 c 141 14 1 tetradecenoic myristolenic oleomyristic omega 5 monounsaturated mono unsaturated fatty fat triglyceride lipid"}],
  ["f16d1cn7", {code:"f16d1cn7",name:"Palmitoleic acid (C16:1)",tags:"c161 c 161 16 1 hexadec enoic palmitoleic hexadecenoic omega 7 monounsaturated mono unsaturated fatty fat triglyceride lipid"}],
  ["f18d1cn9", {code:"f18d1cn9",name:"Oleic acid (C18:1n9)",tags:"c181n9 c181 c 181 18 1n9 1 n9 n 9 octadec enoic octadecenoic omega 9 monounsaturated mono unsaturated fatty fat triglyceride lipid"}],
  ["f18d1tn9", {code:"f18d1tn9",name:"Elaidic acid (C18:1n9t)",tags:"c181n9t c 18 1n9t 1n9 1 n9t n9 n 9 t octadec enoic octadecenoic carboxylic trans monounsaturated mono unsaturated fatty fat triglyceride lipid colorless waxy oily solid"}],
  ["f20d1cn9", {code:"f20d1cn9",name:"Eicosenoic acid (C20:1n9)",tags:"c201n9 c201 c20 c 20 201 1n9 1 n9 n 9 gondoic eicos enoic icosenoic icos enoic omega 9 monounsaturated mono unsaturated fatty fat triglyceride lipid"}],
  ["f22d1cn9", {code:"f22d1cn9",name:"Erucic acid (C22:1n9)",tags:"c221n9 c221 c 221 22 1 n9 n 9 docos enoic omega 9 monounsaturated mono unsaturated fatty fat triglyceride lipid white waxy solid"}],
  ["f24d1cn9", {code:"f24d1cn9",name:"Nervonic acid (C24:1n9)",tags:"c241n9 c241 c 241 24 1 n9 n 9 tetracos enoic tetracosenoic omega 9 monounsaturated mono unsaturated fatty fat triglyceride lipid"}],
  ["f18d2cn6", {code:"f18d2cn6",name:"Linoleic acid (C18:2n6)",tags:"c182n6 c182 c 182 18 2 n6 n 6 octadeca dienoic octadecadienoic omega 6 polyunsaturated poly unsaturated fatty fat triglyceride lipid colorless oil"}],
  ["f20d2n6", {code:"f20d2n6",name:"Eicosadienoic acid (C20:2)",tags:"c202 c 202 20 2 eicosa icosa dienoic omega 6 polyunsaturated poly unsaturated fatty fat triglyceride lipid"}],
  ["f22d2n6", {code:"f22d2n6",name:"Docosadienoic acid (C22:2)",tags:"c222 c 222 22 2 docosa dienoic omega 6 polyunsaturated poly unsaturated fatty fat triglyceride lipid"}],
  ["f18d3n3", {code:"f18d3n3",name:"α-Linolenic acid (C18:3n3)",tags:"c183n3 c183 c 183 18 3 n3 n 3 ala lna a alpha octadecatrienoic octadeca trienoic omega 3 polyunsaturated poly unsaturated fatty fat triglyceride lipid"}],
  ["f20d3n6", {code:"f20d3n6",name:"Eicosatrienoic acid (C20:3n6)",tags:"c203n6 c203 c 203 20 3 n6 n 6 eicosa icosa trienoic omega 6 polyunsaturated poly unsaturated fatty fat triglyceride lipid"}],
  ["f20d4n6", {code:"f20d4n6",name:"Arachidonic acid (C20:4n6)",tags:"c204n6 c204 c 204 20 4 n6 n 6 aa ara eicosatetraenoic eicosa icosa tetraenoic arachidonate omega 6 polyunsaturated poly unsaturated fatty fat triglyceride lipid"}],
  ["f20d5n3", {code:"f20d5n3",name:"Eicosapentaenoic acid (C20:5n3)",tags:"c205n3 c205 c 205 20 5 n3 n 3 epa icosapentaenoic timnodonic eicosa icosa pentaenoic omega 3 polyunsaturated poly unsaturated fatty fat triglyceride lipid"}],
  ["f22d5n3", {code:"f22d5n3",name:"Docosapentaenoic acid (C22:5n3)",tags:"c225n3 c225 c 225 22 5 n3 n 3 dpa docosa pentaenoic omega 3 polyunsaturated poly unsaturated fatty fat triglyceride lipid"}],
  ["f22d6n3", {code:"f22d6n3",name:"Docosahexaenoic acid (C22:6n3)",tags:"c226n3 c226 c 226 22 6 n3 n 3 dha docosa hexaenoic cervonic doconexent omega 3 polyunsaturated poly unsaturated fatty fat triglyceride lipid"}],
  ["fasat", {code:"fasat",name:"Total Saturated Fatty acids (TSFA)",tags:"sum fat triglyceride lipid"}],
  ["fams", {code:"fams",name:"Total Monounsaturated Fatty acids (TMUFA)",tags:"sum mono unsaturated fat triglyceride lipid"}],
  ["fapu", {code:"fapu",name:"Total Polyunsaturated Fatty acids (TPUFA)",tags:"sum poly unsaturated fat triglyceride lipid"}],
  ["cholc", {code:"cholc",name:"Cholesterol",tags:"total cholesterin cholesteryl alcohol zoosterol animal sterol lipid white crystalline crystal powder"}],
  ["his", {code:"his",name:"Histidine",tags:"h essential amino acid"}],
  ["ile", {code:"ile",name:"Isoleucine",tags:"i essential amino acid"}],
  ["leu", {code:"leu",name:"Leucine",tags:"l essential amino acid"}],
  ["lys", {code:"lys",name:"Lysine",tags:"k essential amino acid"}],
  ["met", {code:"met",name:"Methionine",tags:"m essential amino acid"}],
  ["cys", {code:"cys",name:"Cysteine",tags:"c essential amino acid"}],
  ["phe", {code:"phe",name:"Phenylalanine",tags:"f essential amino acid"}],
  ["thr", {code:"thr",name:"Threonine",tags:"t essential amino acid"}],
  ["trp", {code:"trp",name:"Tryptophan",tags:"w essential amino acid"}],
  ["val", {code:"val",name:"Valine",tags:"v essential amino acid"}],
  ["ala", {code:"ala",name:"Alanine",tags:"a essential amino acid"}],
  ["arg", {code:"arg",name:"Arginine",tags:"r essential amino acid"}],
  ["asp", {code:"asp",name:"Aspartic acid",tags:"d essential amino acid"}],
  ["glu", {code:"glu",name:"Glutamic acid",tags:"e essential amino acid"}],
  ["gly", {code:"gly",name:"Glycine",tags:"g essential amino acid"}],
  ["pro", {code:"pro",name:"Proline",tags:"p essential amino acid"}],
  ["ser", {code:"ser",name:"Serine",tags:"s essential amino acid"}],
  ["tyr", {code:"tyr",name:"Tyrosine",tags:"y essential amino acid"}],
  ["oxalt", {code:"oxalt",name:"Total Oxalate",tags:"total sum ox ethanedioate oxalic organic acid"}],
  ["oxals", {code:"oxals",name:"Soluble Oxalate",tags:"total ox sodium potassium ethanedioate oxalic organic acid"}],
  ["oxali", {code:"oxali",name:"Insoluble Oxalate",tags:"total ox calcium ethanedioate oxalic organic acid"}],
  ["caconac", {code:"caconac",name:"Cis-Aconitic acid",tags:"achilleic equisetic citridinic pyrocitric organic acid"}],
  ["citac", {code:"citac",name:"Citric acid",tags:"hydroxypropane tricarboxylic organic acid"}],
  ["fumac", {code:"fumac",name:"Fumaric acid",tags:"trans butenedioic but enedioic ethylenedicarboxylic allomaleic boletic donitic lichenic unsaturated organic acid white solid"}],
  ["malac", {code:"malac",name:"Malic acid",tags:"hydroxybutanedioic hydroxysuccinic unsaturated organic acid"}],
  ["quinac", {code:"quinac",name:"Quinic acid",tags:"tetrahydroxycyclohexanecarboxylic tetrahydroxy cyclohexanecarboxylic cyclitol cyclic polyol organic acid"}],
  ["sucac", {code:"sucac",name:"Succinic acid",tags:"butandioic dicarboxylic organic acid"}],
  ["tarac", {code:"tarac",name:"Tartaric acid",tags:"dihydroxybutanedioic dihydroxysuccinic threaric racemic uvic paratartaric organic acid white crystalline crystal powder"}],
  ["dhbenzac34", {code:"dhbenzac34",name:"3,4-Dihydroxy Benzoic acid",tags:"34 dihydroxybenzoic polyphenol poly phenol phenolic phytochemical phyto"}],
  ["hbenzal3", {code:"hbenzal3",name:"3-Hydroxy Benzaldehyde",tags:"Hydroxybenzaldehyde aldehyde polyphenol poly phenol phenolic phytochemical phyto"}],
  ["pcathac", {code:"pcathac",name:"Protocatechuic acid",tags:"pca protocatechuate dihydroxybenzoic dihydroxy benzoic polyphenol poly phenol phenolic phytochemical phyto light brown solid"}],
  ["vanlac", {code:"vanlac",name:"Vanillic acid",tags:"dihydroxybenzoic dihydroxy benzoic vanillin hydroxy methoxybenzoic anisic vanillate polyphenol poly phenol phenolic aromatic phytochemical phyto white light yellow powder crystalline crystal"}],
  ["gallac", {code:"gallac",name:"Gallic acid",tags:"trihydroxybenzoic trihydroxy benzoic polyphenol poly phenol phenolic aromatic phytochemical phyto white yellow pale fawn crystalline crystal"}],
  ["cinmac", {code:"cinmac",name:"Cinnamic acid",tags:"phenylprop enoic phenylacrylic cinnamylic phenylacrylic benzenepropenoic benzenepropenoic hydroxycinnamic aromatic unsaturated carboxylic polyphenol poly phenol phenolic phytochemical phyto white monoclinic crystalline crystal"}],
  ["coumaco", {code:"coumaco",name:"o-Coumaric acid",tags:"ortho hydroxyphenyl prop enoic propenoic hydroxycinnamic aromatic polyphenol poly phenol phenolic phytochemical phyto"}],
  ["coumacp", {code:"coumacp",name:"p-Coumaric acid",tags:"para hydroxyphenyl prop enoic propenoic acrylic hydroxycinnamic aromatic polyphenol poly phenol phenolic phytochemical phyto"}],
  ["caffac", {code:"caffac",name:"Caffeic acid",tags:"dihydroxyphenyl propenoic dihydroxy cinnamic trans caffeate cinnamate dihydroxybenzeneacrylic hydroxycinnamic aromatic polyphenol poly phenol phenolic phytochemical phyto"}],
  ["chlrac", {code:"chlrac",name:"Chlorogenic acid",tags:"cqa dihydroxycinnamoyl quinate quinic caffeoylquinate caffeoylquinic chlorogenate heriguard hydroxycinnamic aromatic trans ester polyphenol poly phenol phenolic phytochemical phyto"}],
  ["ferac", {code:"ferac",name:"Ferulic acid",tags:"propenoic hydroxy methoxyphenyl acrylic methoxy methoxycinnamic ferulate coniferic trans ferulic hydroxycinnamic aromatic polyphenol poly phenol phenolic phytochemical phyto crystalline crystal powder"}],
  ["apigen", {code:"apigen",name:"Apigenin",tags:"flavone flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical yellow pigment crystalline crystal solid trihydroxyflavone apigenine chamomile apigenol spigenin versulin aglycone glycoside"}],
  ["apigen6cgls", {code:"apigen6cgls",name:"Apigenin-6-C-gluoside",tags:"6c 6 flavone flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment isovitexin homovitexin saponaretin"}],
  ["apigen7onshps", {code:"apigen7onshps",name:"Apigenin-7-O-neohesperidoside",tags:"7o 7 flavone flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment rhoifolin"}],
  ["luteol", {code:"luteol",name:"Luteolin",tags:"flavone flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical yellow pigment crystalline crystal luteolol digitoflavone flacitran luteoline"}],
  ["kaemf", {code:"kaemf",name:"Kaempferol",tags:"flavonol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical yellow pigment crystalline crystal solid antioxidant kaempherol robigenin pelargidenolon rhamnolutein rhamnolutin populnetin trifolitin kempferol swartziol"}],
  ["querce", {code:"querce",name:"Quercetin",tags:"flavonol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical yellow pigment crystalline crystal powder bitter flavor sophoretin meletin quercetine xanthaurine quercetol quercitin quertine flavin meletin"}],
  ["querce3bdgls", {code:"querce3bdgls",name:"Quercetin-3-β-D-glucoside",tags:"3βd 3bd 3β 3b βd bd 3 beta b flavonol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment isoquercetin isoquercitrin isoquercitroside isoquercitin trifoliin isotrifolin isohyperoside isotrifoliin glucopyranoside"}],
  ["querce3ortns", {code:"querce3ortns",name:"Quercetin-3-O-rutinoside",tags:"3o 3 flavonol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment rutin rutoside sophorin phytomelin sophorin birutan eldrin globularicitrin violaquercitrin glycoside"}],
  ["querce3bgls", {code:"querce3bgls",name:"Quercetin-3-β-galactoside",tags:"3β 3b 3 beta b flavonol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment hyperoside hyperozide hyperasid hyperosid hyperin"}],
  ["isormt", {code:"isormt",name:"Isorhamnetin",tags:"flavonol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment methylquercetin isorhamnetol isorhamentin isorhamnetine rhamnetin methoxyquercetin methylated"}],
  ["myrct", {code:"myrct",name:"Myricetin",tags:"flavonol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment cannabiscetin myricetol myricitin"}],
  ["rsvrtol", {code:"rsvrtol",name:"Resvertrol",tags:"aglycone stilbenoid phenylpropanoid polyphenol poly phenol phenolic phytochemical trihydroxystilbene stilbenetriol trans phytoalexin"}],
  ["hespt", {code:"hespt",name:"Hesperetin",tags:"eriodictyol flavanone flavanoid polyphenol poly phenol phenolic phytochemical"}],
  ["narng", {code:"narng",name:"Naringenin",tags:"flavanone flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical  colourless pigment bitter naringetol salipurol salipurpol trihydroxyflavanone"}],
  ["hespd", {code:"hespd",name:"Hesperdin",tags:"flavanone flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment hesperetin rutinoside flavan glycoside"}],
  ["daidzn", {code:"daidzn",name:"Daidzein",tags:"formononetin isoflavone phytoestrogens isoflavonoid flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pale yellow pigment prism dihydroxyisoflavone daidzeol isoaurostatin"}],
  ["gnstein", {code:"gnstein",name:"Genistein",tags:"biochanin a isoflavone phytoestrogens isoflavonoid flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment angiogenesis inhibitor"}],
  ["epicatec", {code:"epicatec",name:"(-)-Epicatechin",tags:"epi catechin flavan flavanol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment antioxidant catechin"}],
  ["epicategc", {code:"epicategc",name:"(-)-Epigallo catechin",tags:"epigallo catechin epigallocatechin epigallocatechin flavan flavanol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment"}],
  ["epicatgc3gal", {code:"epicatgc3gal",name:"(-)-Epigallo catechin 3-gallate",tags:"epigallocatechin flavan flavanol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment egcg catechin"}],
  ["catec", {code:"catec",name:"(+)-Catechin",tags:"catechin catechin flavan flavanol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical colorless pigment solid antioxidant cianidanol cyanidanol catechinic catechuic cianidol dexcyanidanol trans flavanpentol"}],
  ["galcatecgal", {code:"galcatecgal",name:"(-)-Gallocatechin gallate",tags:"gallo catechin flavan flavanol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment gcg"}],
  ["galcatec", {code:"galcatec",name:"(-)-Gallocatechin",tags:"gallocatechin gallo catechin gallo catechin flavan flavanol flavonoid polyphenol poly phenol polyhydroxyphenol phenolic hydroxyl phytochemical pigment antioxidant gc gallocatechol"}],
  ["syrgac", {code:"syrgac",name:"Syringic acid",tags:"trihydroxybenzoic polyphenol poly phenol phenolic phytochemical"}],
  ["sinpac", {code:"sinpac",name:"Sinapinic acid",tags:"sinapic dimethoxycinnamic hydroxycinnamic aromatic polyphenol poly phenol phenolic phytochemical"}],
  ["ellgac", {code:"ellgac",name:"Ellagic acid",tags:"dilactone hexahydroxydiphenic polyphenol poly phenol phenolic aromatic phytochemical antioxidant antiproliferative"}],
  ["polyph", {code:"polyph",name:"Total polyphenols",tags:"sum poly phenol phenolic phytochemical"}],
  ["rafs", {code:"rafs",name:"Raffinose",tags:"rafinosa gossypose melitose melitriose galactosylsucrose fructofuranosyl galactopyranosyl glucopyranoside trisaccharide oligosaccharide carbohydrate"}],
  ["stas", {code:"stas",name:"Stachyose",tags:"fructofuranosyl galactopyranosyl glucopyranoside tetrasaccharide oligosaccharide carbohydrate"}],
  ["vers", {code:"vers",name:"Verbascose",tags:"pentasaccharide oligosaccharide carbohydrate"}],
  ["ajgs", {code:"ajgs",name:"Ajugose",tags:"hexasaccharide oligosaccharide carbohydrate"}],
  ["camt", {code:"camt",name:"Campesterol",tags:"phytosterol plant sterol phytosteroid steroid alcohol campestanol"}],
  ["stgstr", {code:"stgstr",name:"Stigmasterol",tags:"phytosterol plant sterol phytosteroid steroid alcohol unsaturated white solid wulzen anti stiffness factor"}],
  ["stostrb", {code:"stostrb",name:"β-Sitosterol",tags:"b beta phytosterol plant sterol phytosteroid steroid alcohol white waxy powder soild"}],
  ["phytac", {code:"phytac",name:"Phytate",tags:"ip6 ip 6 phytic inositol hexakisphosphate polyphosphate cyclohexane hexayl hexakis dihydrogen phosphate salt saturated cyclic acid"}],
  ["sapon", {code:"sapon",name:"Total Saponin",tags:"triterpene triterpenoid glycoside amphipathic lipophilic hydrophilic soap foaming"}],
  ["vitb", {code:"vitb",name:"Total Vitamin B",tags:"sum vitamin b"}],
  ["vitd", {code:"vitd",name:"Total Vitamin D",tags:"sum vitamin d"}],
  ["vitk", {code:"vitk",name:"Total Vitamin K",tags:"sum vitamin k"}],
  ["tocph", {code:"tocph",name:"Tocopherols",tags:"total sum tocopherol tcp methylated phenol vitamin e antioxidant"}],
  ["toctr", {code:"toctr",name:"Tocotrienols",tags:"total sum tocotrienol vitamin e antioxidant"}],
  ["amiace", {code:"amiace",name:"Essential Amino acids",tags:"total sum essential"}],
  ["amiacce", {code:"amiacce",name:"Conditionally essential Amino acids",tags:"total sum"}],
  ["amiacne", {code:"amiacne",name:"Non-essential Amino acids",tags:"total sum"}],
  ["amiac", {code:"amiac",name:"Total Amino acids",tags:"total sum amino acid"}],
  ["orgac", {code:"orgac",name:"Organic acids",tags:"total sum organic acid"}],
  ["fauns", {code:"fauns",name:"Total unsaturated Fatty acids",tags:"sum good healthy fat lipid"}],
  ["faess", {code:"faess",name:"Essential Fatty acids",tags:"total sum good healthy fat lipid"}],
  ["facn3", {code:"facn3",name:"Cis ω-3 Fatty acids",tags:"total sum ω3 w3 w 3 omega good healthy fat lipid"}],
  ["facn6", {code:"facn6",name:"Cis ω-6 Fatty acids",tags:"total sum ω6 w6 w 6 omega good healthy fat lipid"}],
  ["facn9", {code:"facn9",name:"Cis ω-9 Fatty acids",tags:"total sum ω9 w9 w 9 omega good healthy fat lipid"}],
  ["famscis", {code:"famscis",name:"Cis Monounsaturated Fatty acids",tags:"total sum good healthy fat lipid"}],
  ["fatrn", {code:"fatrn",name:"Trans Fatty acids",tags:" total sum trans bad unhealthy harmful detrimental damaging fat lipid"}],
  ["olsac", {code:"olsac",name:"Oligosaccharides",tags:"total sum polymer complex saccharide"}],
  ["phystr", {code:"phystr",name:"Phytosterols",tags:"total sum plant sterol stanol phytosteroid natural plant steroid"}],
  ["mnrleq", {code:"mnrleq",name:"Essential Quantity Minerals",tags:"total sum chemical element"}],
  ["mnrlet", {code:"mnrlet",name:"Essential Trace Minerals",tags:"total sum essential chemical element"}],
  ["mnrlpet", {code:"mnrlpet",name:"Possibly essential Trace Minerals",tags:"total sum chemical element"}],
  ["mnrlnet", {code:"mnrlnet",name:"Non-essential Trace Minerals",tags:"total sum chemical element"}],
  ["mnrltx", {code:"mnrltx",name:"Toxic Minerals",tags:"total sum chemical element"}],
  ["carot", {code:"carot",name:"Carotenes",tags:"total sum carotene carotin photosythetic orange pigment carotenoid"}],
  ["xantp", {code:"xantp",name:"Xanthophylls",tags:"total sum xanthophyll phylloxanthin yellow pigment carotenoid"}],
  ["cartbeq", {code:"cartbeq",name:"β-Carotene equivalents",tags:"total sum beta b carotene carotenoid provitamin previtamin a"}],
  ["vita", {code:"vita",name:"Total Vitamin A",tags:"sum vitamin vitamin-a"}],
  ["vit", {code:"vit",name:"Total Vitamins",tags:"sum vitamin vitamin vitamin"}],
]);
module.exports = CORPUS;
