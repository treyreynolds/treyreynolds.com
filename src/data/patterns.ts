const patterns = {
  methuselah: `x = 78, y = 54, rule = B3/S23
77bo$77bo$77bo21$3o20$3bo$3bo$3bo5$20b3o$9b3o10bo$22bo$21bo!`,
  noise: `x = 8, y = 8, rule = B3/S23
obo3b2o$3ob2o$obobobo$3bo3bo$o2bob2o$obo4bo$3o2b3o$2o3bobo!`,
  oscilator: `x = 97, y = 97, rule = B3/S23
37bo33bo$36b2o32b2o$35bobo31bobo$36bobo31bobo$36bob2o2b2o26bob2o2b2o$
30bo7bo25bo7bo$30bo33bo3$30bo15bo17bo15bo$29b3o12b2obo15b3o12b2obo$26b
3o17b3o11b3o17b3o$27bob2o12b3o15bob2o12b3o$28bo15bo17bo15bo$11bo$10b2o
$9bobo32bo33bo$10bobo23bo7bo25bo7bo$10bob2o2b2o13b2o2b2obo26b2o2b2obo$
4bo7bo23bobo31bobo$4bo32bobo31bobo$37b2o32b2o$37bo33bo$4bo15bo$3b3o12b
2obo$3o17b3o$bob2o12b3o65bo$2bo15bo65b2o$83bobo$84bobo$18bo65bob2o2b2o
$10bo7bo59bo7bo$5b2o2b2obo65bo$10bobo$11bobo$11b2o65bo15bo$11bo65b3o
12b2obo$74b3o17b3o$75bob2o12b3o$76bo15bo$46b3o$45bo2bo$45b2o2bo42bo$
48bo35bo7bo$45bo2bo30b2o2b2obo$45bobo3b2ob2o28bobo$46bo3bo3bobo28bobo$
42bo8bo4bo28b2o$11bo28b2ob2o7b2ob2o28bo$10b2o28bo4bo8bo$9bobo28bobo3bo
3bo$10bobo28b2ob2o3bobo$10bob2o2b2o30bo2bo$4bo7bo35bo$4bo42bo2b2o$48bo
2bo$48b3o$4bo15bo$3b3o12b2obo$3o17b3o$bob2o12b3o65bo$2bo15bo65b2o$83bo
bo$84bobo$18bo65bob2o2b2o$10bo7bo59bo7bo$5b2o2b2obo65bo$10bobo$11bobo$
11b2o65bo15bo$11bo65b3o12b2obo$74b3o17b3o$75bob2o12b3o$76bo15bo$25bo
33bo$24b2o32b2o$23bobo31bobo32bo$24bobo31bobo23bo7bo$24bob2o2b2o26bob
2o2b2o13b2o2b2obo$18bo7bo25bo7bo23bobo$18bo33bo32bobo$85b2o$85bo$18bo
15bo17bo15bo$17b3o12b2obo15b3o12b2obo$14b3o17b3o11b3o17b3o$15bob2o12b
3o15bob2o12b3o$16bo15bo17bo15bo3$32bo33bo$24bo7bo25bo7bo$19b2o2b2obo
26b2o2b2obo$24bobo31bobo$25bobo31bobo$25b2o32b2o$25bo33bo!`,
  robin: `x = 79, y = 31, rule = B3/S23
6bo3bob2o$6b3obo3bo18b3o$5b2o4b3o3b2o15b2o2b2o$5bo3bo6b2o14bo2bobo$o3bo
4b2obo3bo2bobo11bo4bobo$bob3o5b3o2bo4bo13bo4b2o$bo3b4obob2o3bob2obo2b3o
2bo3bobo4bobob2o$6b3o2bo2b2o5b2o2b2obo3b2o2b2o3bobob2o$7b2o2bo2b2o5b2o2
b2obobob2o4bo2bo11b2o$12bobo6b2o2bo2bob2obo5bob2o4bo5bobo$21bobob2ob2o3
b2o3b2o2b2o3bo5bo3bo$20bo5b3o5bob2obo4bo2bo5bo3b4o$20bo3b3o8bo9b2o3bo2b
o3bo5b3o$20bo24bob3obo6bo2bo$22bo22b3o3bo10bobob2o$45b2o2b2o3bo3b2ob4ob
obo2b2o$46bob3obo5bo5bo7bo$45b2o2b2obo6bobo4bo5b3o$52b2o6bobobo3bo4b2o$
47bobo4b2obob2o2b3ob2ob2ob2o$48bo11b4obo4b2ob2o2$68bo6b2o$68bo6bobo$68b
o3bo2bo$69bobobo4bo$71bobo2b3o$67bo3bo2bo$67bo3bob2o$69bo2bo$70bo!`,
  bandersnatch: `x = 50, y = 46, rule = B3/S23
o$b2o$2o16$45bo$44bobo$44bobo$43b2ob3o$31b2o16bo$31b2o10b2ob3o$43b2obo
7$46b2o$37bo8b2o$36bobo$36bo2bo$37b2o$20b2o$19bobo$19bo24b2o$18b2o24b
2o5$35b2o$35b2o!`,
  trey: `x = 48, y = 20, rule = B3/S23
35b4o$29b2ob3o3b3o$17b4o10bo8b2o$12b5o15bo8bo$7b6o19b2o7bo$5b3o25bo6b
2o$3b3o2bo24bo5b2o$b3o4bo24bob5o$2o6bo24bo2b2o$8bo5bo3b2obo3bo7bo3b2o
$8bo3b3o2b3obo3bo7bo4bo7b2o$8bo2b2o3b3o3bo2bo6b2o5b2o5b2o$8bo3bo3b2ob
2ob2obo6bo7b3o$8bo3bo4b3o3b3o6bo$7b3o14b2o6bo$23b3o$21bob2o$20b4o$8b15o
$15b7o!`,
  ticker: `x = 1484, y = 641, rule = B3/S23
2$417bo$418bo3bo$409b2o2b2o8bo12b2o$409b2o2bo5b2o2bo12b2o$413bobo5b2o$414b2o3b3o2$414b2o3b3o$413bobo5b2o$413bo5b2o2bo$413b2o8bo$418bo3bo$417bo2$446b2o$446b2o3$532bo$533bo3bo$524b2o2b2o8bo12b2o$524b2o2bo5b2o2bo12b2o$439b3o3b3o80bobo5b2o$439bo2bobo2bo81b2o3b3o$438bo3bobo3bo$438b4o3b4o80b2o3b3o$439bo7bo80bobo5b2o$528bo5b2o2bo$528b2o8bo$533bo3bo$532bo$438b$561b2o$446bo114b2o$445b3o$444bo3bo$444b2ob2o198bo$444b2ob2o199bo3bo$639b2o2b2o8bo12b2o$444b2ob2o190b2o2bo5b2o2bo12b2o$444b2ob2o105b3o3b3o80bobo5b2o$439b2o3bo3bo105bo2bobo2bo81b2o3b3o$439b2o4b3o105bo3bobo3bo$446bo106b4o3b4o80b2o3b3o$554bo7bo80bobo5b2o$643bo5b2o2bo$643b2o8bo$648bo3bo$647bo$553b$676b2o$561bo114b2o$560b3o$559bo3bo$559b2ob2o198bo$559b2ob2o199bo3bo$754b2o2b2o8bo12b2o$559b2ob2o190b2o2bo5b2o2bo12b2o$559b2ob2o105b3o3b3o80bobo5b2o$503bobo48b2o3bo3bo105bo2bobo2bo81b2o3b3o$503b2o49b2o4b3o105bo3bobo3bo$504bo56bo106b4o3b4o80b2o3b3o$669bo7bo80bobo5b2o$758bo5b2o2bo$758b2o8bo$763bo3bo$762bo$668b$791b2o$676bo114b2o$493bo181b3o$491b2o181bo3bo$492b2o180b2ob2o90b2o106bo$674b2ob2o90bobo106bo3bo$769bo99b2o2b2o8bo12b2o$674b2ob2o190b2o2bo5b2o2bo12b2o$674b2ob2o105b3o3b3o80bobo5b2o$669b2o3bo3bo105bo2bobo2bo81b2o3b3o$669b2o4b3o105bo3bobo3bo$676bo106b4o3b4o80b2o3b3o$784bo7bo80bobo5b2o$873bo5b2o2bo$480bobo390b2o8bo$480b2o396bo3bo$481bo395bo$783b$906b2o$791bo114b2o$790b3o$789bo3bo$789b2ob2o198bo$789b2ob2o199bo3bo$984b2o2b2o8bo12b2o$470bo318b2ob2o190b2o2bo5b2o2bo12b2o$468b2o319b2ob2o105b3o3b3o80bobo5b2o$469b2o262bobo48b2o3bo3bo105bo2bobo2bo81b2o3b3o$733b2o49b2o4b3o105bo3bobo3bo$734bo56bo106b4o3b4o80b2o3b3o$899bo7bo80bobo5b2o$988bo5b2o2bo$988b2o8bo$861bo131bo3bo$859b2o131bo$860b2o36b$1021b2o$457bobo446bo114b2o$457b2o264bo181b3o$458bo262b2o36b2o143bo3bo$722b2o34bobo143b2ob2o77bobo118bo$760bo143b2ob2o77b2o120bo3bo$987bo111b2o2b2o8bo12b2o$904b2ob2o190b2o2bo5b2o2bo12b2o$904b2ob2o105b3o3b3o80bobo5b2o$899b2o3bo3bo105bo2bobo2bo81b2o3b3o$885b3o11b2o4b3o105bo3bobo3bo$887bo18bo106b4o3b4o80b2o3b3o$886bo127bo7bo80bobo5b2o$1103bo5b2o2bo$710bobo390b2o8bo$710b2o396bo3bo$711bo395bo$1013b$1136b2o$1021bo114b2o$1020b3o$874b2o143bo3bo$873bobo143b2ob2o198bo$875bo143b2ob2o199bo3bo$1214b2o2b2o8bo12b2o$1019b2ob2o190b2o2bo5b2o2bo12b2o$1019b2ob2o105b3o3b3o80bobo5b2o$963bobo48b2o3bo3bo105bo2bobo2bo81b2o3b3o$963b2o49b2o4b3o105bo3bobo3bo$964bo56bo106b4o3b4o80b2o3b3o$1129bo7bo80bobo5b2o$1218bo5b2o2bo$825bobo390b2o8bo$825b2o35b3o226bo131bo3bo$826bo37bo224b2o131bo$863bo226b2o36b$1251b2o$1136bo114b2o$1135b3o$989b2o143bo3bo$988bobo143b2ob2o90b2o106bo$990bo143b2ob2o90bobo106bo3bo$1229bo99b2o2b2o8bo12b2o$1134b2ob2o190b2o2bo5b2o2bo12b2o$851b2o281b2ob2o105b3o3b3o80bobo5b2o$850bobo276b2o3bo3bo105bo2bobo2bo81b2o3b3o$852bo276b2o4b3o105bo3bobo3bo$1136bo106b4o3b4o80b2o3b3o$677bo566bo7bo80bobo5b2o$675b2o36b2o618bo5b2o2bo$676b2o34bobo618b2o8bo$714bo262b3o358bo3bo$979bo260b3o94bo$539bo438bo261bo$537b2o702bo124b2o$538b2o262bobo446bo114b2o$802b2o446b3o$803bo445bo3bo$1249b2ob2o198bo$1249b2ob2o199bo3bo$664bobo777b2o2b2o8bo12b2o$664b2o583b2ob2o190b2o2bo5b2o2bo12b2o$665bo300b2o281b2ob2o105b3o3b3o80bobo5b2o$965bobo225bobo48b2o3bo3bo105bo2bobo2bo81b2o3b3o$967bo225b2o35b3o11b2o4b3o105bo3bobo3bo$1194bo37bo18bo106b4o3b4o80b2o3b3o$1231bo127bo7bo80bobo5b2o$1448bo5b2o2bo$1055bobo390b2o8bo$1055b2o35b3o358bo3bo$1056bo37bo357bo$1093bo264b$1481b2o$917bobo446bo114b2o$917b2o35b3o226bo181b3o$918bo37bo224b2o181bo3bo$955bo226b2o180b2ob2o93b$1364b2ob2o93b$1462b$816b3o545b2ob2o$818bo545b2ob2o105b3o3b3o$817bo490bobo48b2o3bo3bo105bo2bobo2bo$1308b2o49b2o4b3o105bo3bobo3bo$641bobo665bo56bo106b4o3b4o$641b2o831bo7bo$642bo300b2o$942bobo225bobo$944bo225b2o35b3o227b$1171bo37bo263b$540b3o665bo264b$542bo930b$541bo939bo$1480b3o$1479bo3bo$1479b2ob2o$667b2o810b2ob2o$666bobo228b$668bo491bo318b2ob2o$1158b2o319b2ob2o$1159b2o313b2o3bo3bo$1474b2o4b3o$756bobo722bo$756b2o264bo440b$757bo262b2o36b2o$1021b2o34bobo228b$1059bo265b$1325b$884bo440b$882b2o36b2o$883b2o34bobo228b$921bo492b$1451b$1451b$1451b$1012b$1276b$1313b$1313b$1313b$874b$1138b$1173b2o$1172bobo228b$1174bo265b$1440b$770b3o667b$772bo262b2o$771bo262bobo228b$368b2o666bo265b$367bobo225bobo704b$369bo225b2o35b3o226bo440b$596bo37bo224b2o38b$633bo226b2o262bobo$1124b2o265b$1125bo302b$494b3o931b$496bo931b$495bo493b$1253b$1290b$356b3o931b$358bo262b2o667b$357bo262bobo225bobo$622bo225b2o35b3o227b$849bo37bo264b$886bo493b$1417b$710bobo704b$710b2o35b3o226bo440b$711bo37bo224b2o38b$748bo226b2o265b$345b2o932b$344bobo932b$346bo262b3o226bo440b$611bo224b2o38b$610bo226b2o265b$1138b3o227b$1140bo264b$700bo438bo265b$698b2o705b$699b2o265b$1000b3o227b$1002bo264b$333b3o665bo265b$335bo931b$334bo490bobo$825b2o35b3o227b$826bo37bo262b2o$863bo262bobo225bobo$1128bo225b2o38b$1355bo38b$1394b$991b$1219b$1256b$1256b$815bo440b$813b2o38b$814b2o262bobo$1078b2o35b3o226bo$1079bo37bo224b2o38b$1116bo226b2o37b$713b2o667b$712bobo225bobo$714bo225b2o35b3o227b$273bobo665bo37bo264b$273b2o703bo265b$274bo300b2o667b$574bobo228b$576bo492b$1106b$1334b$1371b$1371b$1371b$968b$1196b$1233b$1233b$1233b$828b2o$827bobo228b$829bo492b$1359b$654bo704b$652b2o36b2o667b$653b2o34bobo228b$691bo492b$1221b$1221b$1221b$782b$1046b$1081b2o$1080bobo228b$1082bo265b$1348b$1348b$945b$1173b$1210b$1210b$540b3o667b$542bo262b2o$541bo262bobo225bobo$806bo225b2o265b$1033bo302b$1336b$1336b$897b$931b3o227b$933bo264b$932bo265b$1198b$756bobo$756b2o264bo$757bo262b2o38b$1021b2o265b$1325b$1325b$655b3o667b$657bo264b$217bo438bo493b$215b2o970b$216b2o969b$517b3o667b$519bo264b$518bo490bobo$1009b2o35b3o227b$1010bo37bo264b$1047bo265b$1313b$871bobo$871b2o35b3o227b$872bo37bo264b$909bo265b$506b2o667b$505bobo228b$507bo492b$1035b2o$332bo701bobo228b$330b2o704bo265b$331b2o969b$632b3o667b$634bo264b$633bo493b$1164b$1164b$494b3o667b$496bo262b2o$495bo262bobo228b$760bo262b3o227b$1025bo264b$1024bo265b$1290b$851b$885b3o227b$887bo264b$447bo438bo265b$445b2o705b$446b2o262bobo$710b2o264bo$711bo262b2o38b$975b2o265b$1279b$8b2o1269b$8b2o1269b$876b$1104b$1141b$434bobo704b$434b2o705b$435bo300b2o$735bobo225bobo$737bo225b2o35b3o227b$964bo37bo264b$1001bo265b$1267b$828b$b2o5b2o1081bo$o2bo3bo2bo1078b2o38b$bo2bobo2bo414bo665b2o37b$4bobo415b2o705b$2b3ob3o114b2o298b2o265b$3o5b3o112b2o828bo$2o7b2o940b2o36b2o$2o7b2o941b2o34bobo228b$bob2ob2obo980bo265b$b3o3b3o1246b$2bo5bo577b3o226bo440b$10bo5bo571bo224b2o36b2o$9b3o3b3o569bo226b2o34bobo228b$9bob2ob2obo834bo265b$8b2o7b2o1099b$8b2o7b2o429b3o667b$8b3o5b3o431bo262b2o$10b3ob3o432bo262bobo225bobo$12bobo101b2o5b2o589bo225b2o35b3o227b$9bo2bobo2bo97bo2bo3bo2bo147bobo665bo37bo264b$8bo2bo3bo2bo97bo2bobo2bo148b2o703bo265b$9b2o5b2o101bobo152bo969b$117b3ob3o114b2o565b$115b3o5b3o112b2o829b$115b2o7b2o980b$115b2o7b2o980b$116bob2ob2obo312b2o667b$116b3o3b3o311bobo228b$117bo5bo314bo492b$125bo5bo836b$124b3o3b3o1063b$28b2o94bob2ob2obo1100b$28b2o93b2o7b2o1099b$123b2o7b2o429b3o667b$16b2o105b3o5b3o431bo264b$16b2o107b3ob3o432bo493b$127bobo101b2o5b2o855b$124bo2bobo2bo97bo2bo3bo2bo147bobo704b$123bo2bo3bo2bo97bo2bobo2bo148b2o35b3o667b$124b2o5b2o101bobo152bo37bo264b$232b3ob3o114b2o71bo493b$230b3o5b3o112b2o829b$230b2o7b2o980b$87b2o141b2o7b2o980b$30bo3bo52b2o142bob2ob2obo981b$30bo3bo196b3o3b3o542b$232bo5bo807b$240bo5bo836b$27b2obo3bob2o201b3o3b3o130bo704b$28b3o3b3o43b3o3b3o54b2o94bob2ob2obo128b2o705b$29bo5bo44bo2bobo2bo54b2o93b2o7b2o128b2o265b$79bo3bobo3bo148b2o7b2o429b3o227b$80bo2bobo2bo42b2o105b3o5b3o431bo264b$82bo3bo44b2o107b3ob3o432bo493b$80b2o5b2o153bobo101b2o5b2o855b$79b3o5b3o149bo2bobo2bo97bo2bo3bo2bo854b$79b3o5b3o148bo2bo3bo2bo97bo2bobo2bo185b3o226bo440b$239b2o5b2o101bobo190bo224b2o38b$35b2o310b3ob3o114b2o71bo226b2o265b$35b2o308b3o5b3o112b2o602b$345b2o7b2o9bobo704b$80b3o119b2o141b2o7b2o9b2o705b$80b3o62bo3bo52b2o142bob2ob2obo11bo302b$79b5o61bo3bo196b3o3b3o542b$78b2o3b2o262bo5bo807b$78b2o3b2o270bo5bo836b$142b2obo3bob2o201b3o3b3o835b$143b3o3b3o43b3o3b3o54b2o94bob2ob2obo835b$144bo5bo44bo2bobo2bo54b2o93b2o7b2o395b$78b2o3b2o109bo3bobo3bo148b2o7b2o429b3o227b$78b2o3b2o2b2o106bo2bobo2bo42b2o105b3o5b3o431bo264b$79b5o3b2o108bo3bo44b2o107b3ob3o432bo265b$80b3o112b2o5b2o153bobo31b2o68b2o5b2o590b$80b3o111b3o5b3o149bo2bobo2bo27bobo67bo2bo3bo2bo150b$194b3o5b3o148bo2bo3bo2bo28bo68bo2bobo2bo415b$354b2o5b2o101bobo455b$150b2o310b3ob3o114b2o565b$150b2o308b3o5b3o112b2o602b$460b2o7b2o716b$195b3o119b2o141b2o7b2o716b$195b3o62bo3bo52b2o142bob2ob2obo314b$194b5o61bo3bo196b3o3b3o542b$193b2o3b2o262bo5bo580b$193b2o3b2o270bo5bo572b$257b2obo3bob2o201b3o3b3o571b$258b3o3b3o43b3o3b3o54b2o94bob2ob2obo166b2o$259bo5bo44bo2bobo2bo54b2o93b2o7b2o164bobo225bobo$193b2o3b2o109bo3bobo3bo148b2o7b2o166bo225b2o264bo$193b2o3b2o2b2o106bo2bobo2bo42b2o105b3o5b3o393bo262b2o38b$194b5o3b2o108bo3bo44b2o107b3ob3o659b2o37b$195b3o112b2o5b2o153bobo31b2o68b2o5b2o590b$195b3o111b3o5b3o149bo2bobo2bo27bobo67bo2bo3bo2bo150b$309b3o5b3o148bo2bo3bo2bo5bo22bo68bo2bobo2bo415b$469b2o5b2o7b2o92bobo455b$265b2o217b2o91b3ob3o114b2o337b$265b2o308b3o5b3o112b2o337b$575b2o7b2o12b$310b3o119b2o141b2o7b2o46b3o227b$310b3o62bo3bo52b2o142bob2ob2obo49bo264b$309b5o61bo3bo196b3o3b3o48bo490bobo$308b2o3b2o262bo5bo540b2o38b$308b2o3b2o270bo5bo533bo38b$372b2obo3bob2o201b3o3b3o571b$373b3o3b3o43b3o3b3o54b2o94bob2ob2obo168b$374bo5bo44bo2bobo2bo54b2o93b2o7b2o395b$308b2o3b2o109bo3bobo3bo148b2o7b2o432b$308b2o3b2o2b2o106bo2bobo2bo42b2o105b3o5b3o432b$309b5o3b2o108bo3bo44b2o107b3ob3o434b$310b3o112b2o5b2o153bobo101b2o5b2o$310b3o111b3o5b3o149bo2bobo2bo97bo2bo3bo2bo150b$424b3o5b3o148bo2bo3bo2bo97bo2bobo2bo415b$584b2o5b2o101bobo455b$380b2o310b3ob3o114b2o337b$380b2o308b3o5b3o112b2o337b$690b2o7b2o12b$425b3o119b2o141b2o7b2o276b$425b3o62bo3bo52b2o142bob2ob2obo314b$424b5o61bo3bo196b3o3b3o314b$423b2o3b2o262bo5bo315b$423b2o3b2o270bo5bo$487b2obo3bob2o201b3o3b3o131b$488b3o3b3o43b3o3b3o54b2o94bob2ob2obo168b$489bo5bo44bo2bobo2bo54b2o93b2o7b2o395b$423b2o3b2o109bo3bobo3bo148b2o7b2o432b$423b2o3b2o2b2o106bo2bobo2bo42b2o105b3o5b3o432b$424b5o3b2o108bo3bo44b2o107b3ob3o434b$425b3o112b2o5b2o153bobo101b2o5b2o$425b3o111b3o5b3o149bo2bobo2bo97bo2bo3bo2bo150b$539b3o5b3o148bo2bo3bo2bo97bo2bobo2bo188b$699b2o5b2o101bobo191b$495b2o310b3ob3o114b2o73b$495b2o308b3o5b3o112b2o$805b2o7b2o9bobo$540b3o119b2o141b2o7b2o9b2o265b$540b3o62bo3bo52b2o142bob2ob2obo11bo302b$539b5o61bo3bo196b3o3b3o314b$538b2o3b2o262bo5bo315b$538b2o3b2o270bo5bo$602b2obo3bob2o201b3o3b3o131b$603b3o3b3o43b3o3b3o54b2o94bob2ob2obo168b$604bo5bo44bo2bobo2bo54b2o93b2o7b2o167b$538b2o3b2o109bo3bobo3bo148b2o7b2o167b$538b2o3b2o2b2o106bo2bobo2bo42b2o105b3o5b3o$539b5o3b2o108bo3bo44b2o107b3ob3o$540b3o112b2o5b2o153bobo101b2o5b2o$540b3o111b3o5b3o149bo2bobo2bo97bo2bo3bo2bo150b$654b3o5b3o148bo2bo3bo2bo97bo2bobo2bo188b$814b2o5b2o101bobo191b$610b2o310b3ob3o114b2o73b$610b2o308b3o5b3o112b2o$920b2o7b2o12b$655b3o119b2o141b2o7b2o49b$655b3o62bo3bo52b2o142bob2ob2obo50b$654b5o61bo3bo196b3o3b3o50b$653b2o3b2o262bo5bo$653b2o3b2o270bo5bo$717b2obo3bob2o201b3o3b3o131b$718b3o3b3o43b3o3b3o54b2o94bob2ob2obo168b$719bo5bo44bo2bobo2bo54b2o93b2o7b2o167b$653b2o3b2o109bo3bobo3bo148b2o7b2o167b$653b2o3b2o2b2o106bo2bobo2bo42b2o105b3o5b3o$654b5o3b2o108bo3bo44b2o107b3ob3o$655b3o112b2o5b2o153bobo101b2o5b2o$655b3o111b3o5b3o149bo2bobo2bo97bo2bo3bo2bo$769b3o5b3o148bo2bo3bo2bo97bo2bobo2bo$929b2o5b2o101bobo$725b2o310b3ob3o$725b2o308b3o5b3o$1035b2o7b2o12b$770b3o119b2o141b2o7b2o49b$770b3o62bo3bo52b2o142bob2ob2obo50b$769b5o61bo3bo196b3o3b3o50b$768b2o3b2o262bo5bo$768b2o3b2o270bo5bo$832b2obo3bob2o201b3o3b3o$833b3o3b3o43b3o3b3o54b2o94bob2ob2obo$834bo5bo44bo2bobo2bo54b2o93b2o7b2o$768b2o3b2o109bo3bobo3bo148b2o7b2o$768b2o3b2o2b2o106bo2bobo2bo42b2o105b3o5b3o$769b5o3b2o108bo3bo44b2o107b3ob3o$770b3o112b2o5b2o153bobo33b$770b3o111b3o5b3o149bo2bobo2bo30b$884b3o5b3o148bo2bo3bo2bo29b$1044b2o5b2o9b$840b2o220b$840b2o2$885b3o119b2o$885b3o62bo3bo52b2o$884b5o61bo3bo$883b2o3b2o$883b2o3b2o$947b2obo3bob2o114b$948b3o3b3o43b3o3b3o54b2o7b$949bo5bo44bo2bobo2bo54b2o7b$883b2o3b2o109bo3bobo3bo$883b2o3b2o2b2o106bo2bobo2bo42b2o$884b5o3b2o108bo3bo44b2o$885b3o112b2o5b2o$885b3o111b3o5b3o$999b3o5b3o2$955b2o$955b2o2$1000b3o119b2o$1000b3o62bo3bo52b2o$999b5o61bo3bo$998b2o3b2o$998b2o3b2o$1062b2obo3bob2o$1063b3o3b3o43b3o3b3o$1064bo5bo44bo2bobo2bo$998b2o3b2o109bo3bobo3bo$998b2o3b2o2b2o106bo2bobo2bo$999b5o3b2o108bo3bo$1000b3o112b2o5b2o$1000b3o111b3o5b3o$1114b3o5b3o2$1070b2o$1070b2o2$1115b3o$1115b3o$1114b5o$1113b2o3b2o$1113b2o3b2o4$1113b2o3b2o$1113b2o3b2o2b2o$1114b5o3b2o$1115b3o$1115b3o!`,
};

export default patterns;