'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChefHat, Users, ChevronDown, Heart, Download, ShoppingCart, Search, Flame, MessageCircle, Send, Play, X, ThumbsUp } from 'lucide-react';
import { useApp } from '../AppContext';

type Step = { text: string; image?: string; video?: string };
type Comment = { id: string; user: string; text: string; time: string };
type Recipe = {
  id: string;
  title: string;
  tribe: string;
  time: string;
  level: string;
  image: string;
  ingredients: string[];
  steps: Step[];
  video?: string;
  author: string;
  likes: number;
  liked?: boolean;
  comments: Comment[];
};

const IMG_POOL = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  'https://images.unsplash.com/photo-1512621776952-a57141f2eefd?w=600',
];

function img(i: number) { return IMG_POOL[i % IMG_POOL.length]; }

const TRIBES = ['All', 'Ao', 'Sumi', 'Lotha', 'Angami', 'Konyak', 'Chakhesang', 'Zeliang', 'Rengma', 'Sangtam', 'Phom', 'Yimchunger', 'Chang', 'Khiamniungan', 'Pochury', 'Kuki', 'Garo'];

const RECIPES: Recipe[] = [
  { id:'r1', title:'Smoked Pork with Bamboo Shoot', tribe:'Ao', time:'1h30m', level:'Medium', image:img(0), author:'Imtilong', likes:234, ingredients:['Smoked pork belly 500g','Fermented bamboo shoot 100g','King chili 2pcs','Salt to taste','Water 2 cups'], steps:[{text:'Cut smoked pork into bite-sized pieces and boil for 15 minutes until tender.'},{text:'Add fermented bamboo shoot and king chili, simmer for 20 minutes.'},{text:'Serve hot with steamed rice. The smoky aroma is the signature of this dish.'}], comments:[{id:'c1',user:'Arenla',text:'My grandmother makes this every winter!',time:'2h ago'},{id:'c2',user:'Kevi',text:'Best with sticky rice.',time:'5h ago'}] },
  { id:'r2', title:'Axone Chutney', tribe:'Sumi', time:'20m', level:'Easy', image:img(1), author:'Hovishe', likes:189, ingredients:['Axone paste 2 tbsp','Pork or fish 300g','King chili 1pc','Tomato 1pc','Onion 1pc'], steps:[{text:'Wrap axone paste in banana leaf and roast over fire for 5 minutes.'},{text:'Mix with chopped pork/fish, chili, tomato and onion in a pot.'},{text:'Cook on low flame for 20 minutes until flavors blend. Serve with rice.'}], comments:[{id:'c3',user:'Vizolie',text:'The smell of axone takes me home.',time:'1h ago'}] },
  { id:'r3', title:'Bamboo Steamed Fish', tribe:'Lotha', time:'45m', level:'Easy', image:img(2), author:'Nungsang', likes:156, ingredients:['Fresh river fish 400g','Bamboo tube 1pc','King chili 2pcs','Garlic 3 cloves','Mustard leaves'], steps:[{text:'Clean fish and stuff with crushed chili and garlic.'},{text:'Place inside bamboo tube with mustard leaves.'},{text:'Steam over open fire for 30 minutes until fish is cooked through.'}], comments:[] },
  { id:'r4', title:'Anishi with Pork', tribe:'Ao', time:'1h', level:'Medium', image:img(3), author:'Temsumong', likes:201, ingredients:['Dried taro leaves 200g','Smoked pork 200g','Bamboo shoot 50g','King chili 1pc','Salt'], steps:[{text:'Soak dried taro leaves (anishi) in water for 10 minutes, then drain.'},{text:'Cook with smoked pork, bamboo shoot and king chili in a pot.'},{text:'Simmer for 30 minutes until leaves are tender and flavors meld.'}], comments:[{id:'c4',user:'Lipila',text:'Anishi is my favorite Naga dish!',time:'3h ago'}] },
  { id:'r5', title:'Galho (Rice & Meat Stew)', tribe:'Angami', time:'35m', level:'Easy', image:img(4), author:'Kekhrienuo', likes:278, ingredients:['Sticky rice 300g','Smoked pork 150g','Leafy greens 100g','King chili 1pc','Soda (alkaline water) pinch'], steps:[{text:'Boil smoked pork with water until broth forms.'},{text:'Add sticky rice and cook until semi-mashed, adding water as needed.'},{text:'Add chopped greens and chili, cook 10 more minutes. Serve thick like porridge.'}], comments:[{id:'c5',user:'Thejano',text:'Galho is comfort food on rainy days.',time:'30m ago'}] },
  { id:'r6', title:'Smoked Beef with King Chili', tribe:'Konyak', time:'50m', level:'Medium', image:img(0), author:'Wangpha', likes:312, ingredients:['Smoked beef 500g','King chili 3pcs','Garlic 4 cloves','Ginger 1 inch','Mustard oil 2 tbsp'], steps:[{text:'Slice smoked beef thinly and pan-fry in mustard oil until crisp.'},{text:'Add crushed king chili, garlic and ginger paste, stir well.'},{text:'Cover and cook on low flame for 30 minutes. The heat builds character.'}], comments:[{id:'c6',user:'Hongkam',text:'Konyak beef is the best in Nagaland!',time:'4h ago'}] },
  { id:'r7', title:'Naga Chutney (Tenga)', tribe:'Ao', time:'15m', level:'Easy', image:img(1), author:'Arenla', likes:145, ingredients:['Fermented fish 50g','King chili 2pcs','Tomato 2pcs','Coriander leaves','Salt'], steps:[{text:'Roast fermented fish and king chili over open flame until charred.'},{text:'Mash together with chopped tomato and coriander in a stone mortar.'},{text:'Season with salt. Serve as a fiery side with any main course.'}], comments:[] },
  { id:'r8', title:'Zutho (Rice Beer)', tribe:'Angami', time:'3 days', level:'Hard', image:img(5), author:'Vizolie', likes:98, ingredients:['Sprouted rice 1kg','Yeast starter 50g','Water 5 liters'], steps:[{text:'Sprout rice for 3 days in damp cloth, then dry and powder.'},{text:'Mix with yeast starter and water in a clay pot.'},{text:'Ferment for 5-7 days. Strain and serve chilled in bamboo cups.'}], comments:[{id:'c7',user:'Kevi',text:'Zutho at Hornbill Festival is amazing!',time:'1d ago'}] },
  { id:'r9', title:'Fermented Soybean Dry Chutney', tribe:'Sumi', time:'25m', level:'Easy', image:img(2), author:'Akumi', likes:167, ingredients:['Fermented soybean 100g','King chili 1pc','Dry fish 50g','Tomato 1pc','Salt'], steps:[{text:'Dry roast fermented soybean until aromatic.'},{text:'Grind with king chili, dry fish and tomato in a mortar.'},{text:'Serve dry with rice or as a side dish.'}], comments:[] },
  { id:'r10', title:'Pork with Anise Leaves', tribe:'Chakhesang', time:'1h', level:'Medium', image:img(3), author:'Keneingul', likes:189, ingredients:['Pork 500g','Anise leaves 100g','King chili 2pcs','Garlic 3 cloves','Salt'], steps:[{text:'Boil pork pieces until tender, about 30 minutes.'},{text:'Add chopped anise leaves, chili and garlic.'},{text:'Simmer for 20 minutes until the anise flavor infuses the meat.'}], comments:[{id:'c8',user:'Vesinyi',text:'Anise leaves make this so fragrant!',time:'6h ago'}] },
  { id:'r11', title:'Bamboo Shoot Pickle', tribe:'Zeliang', time:'40m', level:'Easy', image:img(4), author:'Gaibulung', likes:134, ingredients:['Fermented bamboo shoot 200g','Mustard oil 3 tbsp','King chili 2pcs','Garlic 4 cloves','Turmeric'], steps:[{text:'Squeeze excess water from fermented bamboo shoot.'},{text:'Heat mustard oil, add crushed garlic and chili.'},{text:'Add bamboo shoot and turmeric, stir-fry for 15 minutes. Store in jars.'}], comments:[] },
  { id:'r12', title:'Dry Fish Chutney', tribe:'Rengma', time:'20m', level:'Easy', image:img(5), author:'Nzanbeni', likes:112, ingredients:['Dry fish 100g','King chili 2pcs','Tomato 1pc','Onion 1pc','Mustard oil'], steps:[{text:'Roast dry fish over flame until crispy.'},{text:'Grind with chili, tomato and onion in mortar.'},{text:'Add a dash of mustard oil and salt. Serve with rice.'}], comments:[] },
  { id:'r13', title:'Sticky Rice in Bamboo', tribe:'Sangtam', time:'30m', level:'Easy', image:img(0), author:'Atula', likes:256, ingredients:['Sticky rice 300g','Fresh bamboo tube 1pc','Banana leaf'], steps:[{text:'Soak sticky rice for 2 hours, then drain.'},{text:'Pack rice into bamboo tube, seal with banana leaf.'},{text:'Roast over open fire for 25 minutes. The bamboo imparts a sweet aroma.'}], comments:[{id:'c9',user:'Asenla',text:'This tastes like my childhood!',time:'2h ago'}] },
  { id:'r14', title:'Smoked Pork Ribs', tribe:'Phom', time:'1h20m', level:'Medium', image:img(1), author:'Chingmak', likes:198, ingredients:['Pork ribs 600g','Smoking wood chips','King chili 2pcs','Salt','Mustard oil'], steps:[{text:'Smoke pork ribs for 30 minutes using wood chips.'},{text:'Marinate with salt and crushed king chili.'},{text:'Roast in mustard oil for 20 minutes until crispy outside, tender inside.'}], comments:[] },
  { id:'r15', title:'Yam Leaf Curry', tribe:'Yimchunger', time:'45m', level:'Easy', image:img(2), author:'Pfokrelo', likes:143, ingredients:['Yam leaves 200g','Smoked pork 100g','King chili 1pc','Baking soda pinch','Salt'], steps:[{text:'Chop yam leaves finely and wash thoroughly.'},{text:'Boil with smoked pork and a pinch of baking soda for 20 minutes.'},{text:'Add king chili and simmer 15 more minutes until tender.'}], comments:[] },
  { id:'r16', title:'Chang Pork Curry', tribe:'Chang', time:'1h', level:'Medium', image:img(3), author:'Ngachonmi', likes:176, ingredients:['Pork 500g','King chili 3pcs','Ginger 1 inch','Garlic 4 cloves','Tomato 2pcs'], steps:[{text:'Boil pork with ginger and garlic for 20 minutes.'},{text:'Add crushed king chili and chopped tomato.'},{text:'Simmer for 30 minutes until gravy thickens. Serve hot.'}], comments:[{id:'c10',user:'Yanger',text:'Chang pork curry is fire!',time:'3h ago'}] },
  { id:'r17', title:'Khiamniungan Fish Roast', tribe:'Khiamniungan', time:'40m', level:'Easy', image:img(4), author:'Nokshule', likes:121, ingredients:['Whole fish 400g','King chili 2pcs','Garlic 3 cloves','Mustard oil 2 tbsp','Banana leaf'], steps:[{text:'Clean fish and marinate with crushed chili and garlic.'},{text:'Wrap in banana leaf and tie with bamboo string.'},{text:'Roast over fire for 25 minutes, turning occasionally. Serve hot.'}], comments:[] },
  { id:'r18', title:'Pochury Dry Meat', tribe:'Pochury', time:'2h', level:'Medium', image:img(5), author:'Khumdemo', likes:89, ingredients:['Beef or pork 1kg','King chili 3pcs','Salt','Mustard oil'], steps:[{text:'Cut meat into thin strips and salt generously.'},{text:'Sun-dry for 1 day until completely dehydrated.'},{text:'Fry in mustard oil with crushed chili for 15 minutes until crispy.'}], comments:[] },
  { id:'r19', title:'Kuki Chicken Stew', tribe:'Kuki', time:'50m', level:'Easy', image:img(0), author:'Thangboi', likes:165, ingredients:['Chicken 500g','Ginger 1 inch','Garlic 4 cloves','King chili 2pcs','Salt'], steps:[{text:'Cut chicken into pieces and boil with ginger and garlic.'},{text:'Add king chili and salt to taste.'},{text:'Simmer for 30 minutes until chicken is tender and broth is flavorful.'}], comments:[{id:'c11',user:'Haokip',text:'Kuki chicken stew warms the soul.',time:'5h ago'}] },
  { id:'r20', title:'Garo Fish Curry', tribe:'Garo', time:'35m', level:'Easy', image:img(1), author:'Chilan', likes:102, ingredients:['Fish 400g','Turmeric 1 tsp','King chili 2pcs','Mustard oil 2 tbsp','Salt'], steps:[{text:'Fry fish lightly in mustard oil with turmeric.'},{text:'Add water, king chili and salt.'},{text:'Simmer for 20 minutes until gravy thickens. Serve with rice.'}], comments:[] },
  { id:'r21', title:'Colocasia Stem Curry', tribe:'Ao', time:'40m', level:'Easy', image:img(2), author:'Imtilong', likes:118, ingredients:['Colocasia stems 200g','Smoked pork 100g','King chili 1pc','Baking soda pinch','Salt'], steps:[{text:'Peel and chop colocasia stems into pieces.'},{text:'Cook with smoked pork, baking soda and chili for 25 minutes.'},{text:'Simmer until stems are soft and gravy is thick.'}], comments:[] },
  { id:'r22', title:'Sumi Pork with Akhuni', tribe:'Sumi', time:'1h15m', level:'Medium', image:img(3), author:'Hovishe', likes:245, ingredients:['Pork 500g','Akhuni (fermented soybean) 3 tbsp','King chili 2pcs','Tomato 1pc','Onion 1pc'], steps:[{text:'Boil pork pieces until half-cooked, about 20 minutes.'},{text:'Add akhuni paste, crushed chili, tomato and onion.'},{text:'Simmer for 40 minutes until pork is tender and flavors meld deeply.'}], comments:[{id:'c12',user:'Akumi',text:'Akhuni pork is the ultimate Naga dish!',time:'1h ago'},{id:'c13',user:'Vizolie',text:'Smell is strong but taste is heavenly.',time:'3h ago'}] },
  { id:'r23', title:'Angami Glho (Vegetarian)', tribe:'Angami', time:'30m', level:'Easy', image:img(4), author:'Kekhrienuo', likes:134, ingredients:['Sticky rice 250g','Mixed greens 150g','King chili 1pc','Soda pinch','Salt'], steps:[{text:'Cook sticky rice with extra water until mushy.'},{text:'Add chopped greens, chili and soda.'},{text:'Stir well and cook 10 minutes until porridge-like consistency.'}], comments:[] },
  { id:'r24', title:'Konyak Wild Boar', tribe:'Konyak', time:'1h45m', level:'Hard', image:img(5), author:'Wangpha', likes:289, ingredients:['Wild boar meat 600g','King chili 4pcs','Garlic 6 cloves','Ginger 2 inch','Mustard oil'], steps:[{text:'Clean and cut wild boar into chunks.'},{text:'Marinate with crushed chili, garlic and ginger for 30 minutes.'},{text:'Cook in mustard oil on low flame for 1 hour until meat is tender.'}], comments:[{id:'c14',user:'Hongkam',text:'Wild boar tastes incredible!',time:'4h ago'}] },
  { id:'r25', title:'Chakhesang Gaja (Pork Fat)', tribe:'Chakhesang', time:'1h', level:'Medium', image:img(0), author:'Keneingul', likes:156, ingredients:['Pork fat 300g','King chili 2pcs','Garlic 3 cloves','Salt','Mustard leaves'], steps:[{text:'Cut pork fat into cubes and render slowly in a pan.'},{text:'Add crushed garlic and king chili.'},{text:'Cook with mustard leaves for 20 minutes until crispy and flavorful.'}], comments:[] },
  { id:'r26', title:'Zeliang Hegua (Snail Curry)', tribe:'Zeliang', time:'45m', level:'Medium', image:img(1), author:'Gaibulung', likes:78, ingredients:['River snails 300g','King chili 2pcs','Garlic 3 cloves','Mustard oil 2 tbsp','Salt'], steps:[{text:'Clean snails thoroughly by boiling for 10 minutes.'},{text:'Extract meat and fry with garlic and chili in mustard oil.'},{text:'Simmer for 20 minutes with water until tender. A Zeliang delicacy.'}], comments:[] },
  { id:'r27', title:'Rengma Pork with Ginger', tribe:'Rengma', time:'55m', level:'Easy', image:img(2), author:'Nzanbeni', likes:124, ingredients:['Pork 400g','Ginger 2 inch','King chili 2pcs','Garlic 3 cloves','Salt'], steps:[{text:'Boil pork with generous ginger for 25 minutes.'},{text:'Add crushed king chili and garlic.'},{text:'Simmer for 20 minutes. The ginger gives a warm, aromatic kick.'}], comments:[] },
  { id:'r28', title:'Sangtam Dry Fish Powder', tribe:'Sangtam', time:'30m', level:'Easy', image:img(3), author:'Atula', likes:91, ingredients:['Dry fish 200g','King chili 3pcs','Salt'], steps:[{text:'Roast dry fish and king chili over open flame.'},{text:'Grind both together in a stone mortar until powder.'},{text:'Store in airtight container. Sprinkle over rice or curry.'}], comments:[] },
  { id:'r29', title:'Phom Mushroom Curry', tribe:'Phom', time:'35m', level:'Easy', image:img(4), author:'Chingmak', likes:167, ingredients:['Wild mushrooms 300g','Pork 100g','King chili 1pc','Garlic 2 cloves','Salt'], steps:[{text:'Clean wild mushrooms and cut into pieces.'},{text:'Cook with pork, garlic and king chili for 25 minutes.'},{text:'Simmer until mushrooms absorb all flavors. Serve with rice.'}], comments:[{id:'c15',user:'Yanger',text:'Forest mushrooms make this special!',time:'2h ago'}] },
  { id:'r30', title:'Yimchunger Crab Curry', tribe:'Yimchunger', time:'40m', level:'Medium', image:img(5), author:'Pfokrelo', likes:112, ingredients:['River crabs 400g','King chili 2pcs','Garlic 3 cloves','Mustard oil 2 tbsp','Salt'], steps:[{text:'Clean crabs and remove shells.'},{text:'Fry in mustard oil with garlic and king chili.'},{text:'Add water and simmer for 20 minutes until crabs are cooked.'}], comments:[] },
  { id:'r31', title:'Chang Yam Roast', tribe:'Chang', time:'35m', level:'Easy', image:img(0), author:'Ngachonmi', likes:87, ingredients:['Yam 300g','King chili 1pc','Mustard oil 2 tbsp','Salt','Turmeric'], steps:[{text:'Boil yam until fork-tender, then peel and slice.'},{text:'Marinate with turmeric, salt and crushed chili.'},{text:'Roast in mustard oil until golden and crispy on both sides.'}], comments:[] },
  { id:'r32', title:'Khiamniungan Pig Liver', tribe:'Khiamniungan', time:'30m', level:'Easy', image:img(1), author:'Nokshule', likes:76, ingredients:['Pig liver 300g','King chili 2pcs','Garlic 3 cloves','Mustard oil 2 tbsp','Salt'], steps:[{text:'Slice liver thinly and wash with salt water.'},{text:'Fry in mustard oil with garlic and king chili for 15 minutes.'},{text:'Cook until liver is done but still tender. Serve immediately.'}], comments:[] },
  { id:'r33', title:'Pochury Pumpkin Curry', tribe:'Pochury', time:'30m', level:'Easy', image:img(2), author:'Khumdemo', likes:65, ingredients:['Pumpkin 400g','Smoked pork 100g','King chili 1pc','Ginger 1 inch','Salt'], steps:[{text:'Cut pumpkin into cubes and boil with smoked pork.'},{text:'Add crushed ginger and king chili.'},{text:'Simmer for 15 minutes until pumpkin is soft and flavors blend.'}], comments:[] },
  { id:'r34', title:'Kuki Pork with Mustard', tribe:'Kuki', time:'50m', level:'Medium', image:img(3), author:'Thangboi', likes:143, ingredients:['Pork 400g','Mustard greens 150g','King chili 2pcs','Garlic 3 cloves','Salt'], steps:[{text:'Boil pork pieces for 25 minutes until tender.'},{text:'Add chopped mustard greens, chili and garlic.'},{text:'Cook for 15 minutes until greens wilt and flavors combine.'}], comments:[] },
  { id:'r35', title:'Garo Bamboo Soup', tribe:'Garo', time:'35m', level:'Easy', image:img(4), author:'Chilan', likes:82, ingredients:['Fresh bamboo shoot 150g','Pork 100g','King chili 1pc','Garlic 2 cloves','Salt'], steps:[{text:'Slice bamboo shoot thinly and boil with pork for 20 minutes.'},{text:'Add garlic and king chili.'},{text:'Simmer for 10 minutes. A light, warming soup perfect for evenings.'}], comments:[] },
  { id:'r36', title:'Lotha Pork Blood Curry', tribe:'Lotha', time:'40m', level:'Medium', image:img(5), author:'Nungsang', likes:198, ingredients:['Fresh pig blood 200ml','Pork 200g','King chili 2pcs','Ginger 1 inch','Salt'], steps:[{text:'Boil pork with ginger for 15 minutes.'},{text:'Slowly stir in pig blood, stirring constantly to prevent clumping.'},{text:'Add king chili and simmer 15 minutes until thick. A Lotha specialty.'}], comments:[{id:'c16',user:'Imtilong',text:'Blood curry sounds scary but is delicious!',time:'1h ago'}] },
  { id:'r37', title:'Ao Fermented Taro', tribe:'Ao', time:'1h', level:'Medium', image:img(0), author:'Temsumong', likes:134, ingredients:['Fermented taro root 200g','Pork 150g','King chili 2pcs','Garlic 3 cloves','Salt'], steps:[{text:'Soak fermented taro root for 15 minutes, then drain.'},{text:'Cook with pork, garlic and king chili for 30 minutes.'},{text:'Simmer until taro is soft and flavors are fully absorbed.'}], comments:[] },
  { id:'r38', title:'Angami Sesame Chutney', tribe:'Angami', time:'15m', level:'Easy', image:img(1), author:'Vizolie', likes:121, ingredients:['Roasted sesame 50g','King chili 1pc','Fermented fish 30g','Salt','Coriander'], steps:[{text:'Dry roast sesame seeds until golden.'},{text:'Grind with king chili and fermented fish in a mortar.'},{text:'Mix with coriander and salt. A nutty, fiery chutney.'}], comments:[] },
  { id:'r39', title:'Konyak Yam Leaf Stew', tribe:'Konyak', time:'45m', level:'Easy', image:img(2), author:'Wangpha', likes:96, ingredients:['Yam leaves 200g','Smoked pork 100g','King chili 1pc','Baking soda pinch','Salt'], steps:[{text:'Chop yam leaves and wash thoroughly.'},{text:'Boil with smoked pork and baking soda for 25 minutes.'},{text:'Add king chili, simmer 15 minutes. A rustic, earthy stew.'}], comments:[] },
  { id:'r40', title:'Chakhesang Nut Paste Curry', tribe:'Chakhesang', time:'50m', level:'Medium', image:img(3), author:'Keneingul', likes:115, ingredients:['Tree nuts (job\'s tears) 150g','Pork 200g','King chili 1pc','Garlic 2 cloves','Salt'], steps:[{text:'Soak nuts overnight, then grind into a smooth paste.'},{text:'Cook with pork and garlic for 25 minutes.'},{text:'Add king chili, simmer 15 minutes until thick and creamy.'}], comments:[] },
  { id:'r41', title:'Sumi Smoked Rat (Amro)', tribe:'Sumi', time:'1h', level:'Hard', image:img(4), author:'Akumi', likes:87, ingredients:['Smoked field rat 300g','King chili 3pcs','Garlic 4 cloves','Mustard oil 2 tbsp','Salt'], steps:[{text:'Clean smoked rat and cut into pieces.'},{text:'Fry in mustard oil with garlic and king chili for 20 minutes.'},{text:'Simmer with water for 20 minutes. A Sumi tribal delicacy.'}], comments:[{id:'c17',user:'Hovishe',text:'Not for the faint-hearted!',time:'3h ago'}] },
  { id:'r42', title:'Zeliang Corn Soup', tribe:'Zeliang', time:'30m', level:'Easy', image:img(5), author:'Gaibulung', likes:73, ingredients:['Fresh corn 200g','Pork 100g','King chili 1pc','Ginger 1 inch','Salt'], steps:[{text:'Grind fresh corn coarsely and boil with pork for 15 minutes.'},{text:'Add ginger and king chili.'},{text:'Simmer for 10 minutes until soup thickens slightly. Comforting and wholesome.'}], comments:[] },
  { id:'r43', title:'Rengma Fern Curry', tribe:'Rengma', time:'35m', level:'Easy', image:img(0), author:'Nzanbeni', likes:81, ingredients:['Wild fern shoots 200g','Smoked pork 100g','King chili 1pc','Garlic 2 cloves','Salt'], steps:[{text:'Blanch fern shoots in boiling water for 5 minutes, then drain.'},{text:'Cook with smoked pork, garlic and chili for 20 minutes.'},{text:'Simmer until fern is tender. A unique foraged vegetable dish.'}], comments:[] },
  { id:'r44', title:'Sangtam Sticky Rice Cake', tribe:'Sangtam', time:'1h', level:'Medium', image:img(1), author:'Atula', likes:156, ingredients:['Sticky rice flour 300g','Jaggery 100g','Banana leaf','Sesame 20g'], steps:[{text:'Mix sticky rice flour with melted jaggery and sesame.'},{text:'Wrap portions in banana leaf and tie securely.'},{text:'Steam for 40 minutes. A sweet treat for festivals and celebrations.'}], comments:[{id:'c18',user:'Asenla',text:'My mom makes these during Moatsu!',time:'2h ago'}] },
  { id:'r45', title:'Phom King Chili Pickle', tribe:'Phom', time:'1h', level:'Medium', image:img(2), author:'Chingmak', likes:178, ingredients:['King chili (bhut jolokia) 500g','Mustard oil 100ml','Garlic 50g','Ginger 30g','Salt'], steps:[{text:'Blister king chili over open flame, then peel skins.'},{text:'Grind with garlic and ginger into a coarse paste.'},{text:'Mix with salt and mustard oil. Store in jars. Extremely fiery!'},{text:'Use sparingly as a condiment with any meal.'}], comments:[{id:'c19',user:'Wangpha',text:'One drop is enough for a whole plate of rice!',time:'30m ago'}] },
  { id:'r46', title:'Yimchunger Semo Rice', tribe:'Yimchunger', time:'40m', level:'Easy', image:img(3), author:'Pfokrelo', likes:94, ingredients:['Semo rice 250g','Pork 150g','King chili 1pc','Onion 1pc','Salt'], steps:[{text:'Wash semo rice and soak for 15 minutes.'},{text:'Cook with pork, onion and chili for 20 minutes.'},{text:'Simmer until rice is fluffy and pork is tender. Serve hot.'}], comments:[] },
  { id:'r47', title:'Chang Banana Flower Curry', tribe:'Chang', time:'40m', level:'Medium', image:img(4), author:'Ngachonmi', likes:68, ingredients:['Banana flower 200g','Pork 100g','King chili 1pc','Turmeric 1 tsp','Salt'], steps:[{text:'Clean banana flower, remove stamens, and chop finely.'},{text:'Boil with pork and turmeric for 20 minutes to remove bitterness.'},{text:'Add king chili, simmer 15 minutes until tender.'}], comments:[] },
  { id:'r48', title:'Khiamniungan Sticky Rice Pudding', tribe:'Khiamniungan', time:'45m', level:'Easy', image:img(5), author:'Nokshule', likes:112, ingredients:['Sticky rice 200g','Coconut milk 200ml','Jaggery 80g','Cardamom 2 pods'], steps:[{text:'Cook sticky rice in water until very soft.'},{text:'Add coconut milk, jaggery and crushed cardamom.'},{text:'Simmer for 15 minutes until creamy. A rare Naga dessert.'}], comments:[{id:'c20',user:'Nokshule',text:'Sweet dishes are rare in Naga cuisine - this is special!',time:'1h ago'}] },
  { id:'r49', title:'Kuki Fermented Soybean Soup', tribe:'Kuki', time:'40m', level:'Easy', image:img(0), author:'Thangboi', likes:103, ingredients:['Fermented soybean 50g','Chicken 200g','King chili 1pc','Garlic 2 cloves','Salt'], steps:[{text:'Boil chicken with garlic for 15 minutes.'},{text:'Add fermented soybean paste and king chili.'},{text:'Simmer for 15 minutes. A probiotic-rich, aromatic soup.'}], comments:[] },
  { id:'r50', title:'Garo Taro Root Roast', tribe:'Garo', time:'30m', level:'Easy', image:img(1), author:'Chilan', likes:89, ingredients:['Taro root 300g','Mustard oil 2 tbsp','King chili 1pc','Salt','Turmeric'], steps:[{text:'Boil taro root until tender, peel and slice into rounds.'},{text:'Marinate with turmeric, salt and crushed chili.'},{text:'Roast in hot mustard oil until crispy and golden on both sides.'}], comments:[] },
];

export function RecipesSection() {
  const { toggleFavorite, isFavorite, toggleDownload, isDownloaded, addToCart } = useApp();
  const [query, setQuery] = useState('');
  const [activeTribe, setActiveTribe] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeState, setRecipeState] = useState<Record<string, { likes: number; liked: boolean; comments: Comment[] }>>(
    () => Object.fromEntries(RECIPES.map((r) => [r.id, { likes: r.likes, liked: false, comments: r.comments }]))
  );
  const [commentText, setCommentText] = useState('');

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || r.title.toLowerCase().includes(q) || r.tribe.toLowerCase().includes(q) || r.author.toLowerCase().includes(q);
      const matchesTribe = activeTribe === 'All' || r.tribe === activeTribe;
      const matchesLevel = activeLevel === 'All' || r.level === activeLevel;
      return matchesQuery && matchesTribe && matchesLevel;
    });
  }, [query, activeTribe, activeLevel]);

  function handleLike(id: string) {
    setRecipeState((prev) => {
      const cur = prev[id];
      return { ...prev, [id]: { ...cur, likes: cur.liked ? cur.likes - 1 : cur.likes + 1, liked: !cur.liked } };
    });
  }

  function handleComment(id: string) {
    if (!commentText.trim()) return;
    setRecipeState((prev) => {
      const cur = prev[id];
      const newComment: Comment = { id: `c${Date.now()}`, user: 'You', text: commentText.trim(), time: 'now' };
      return { ...prev, [id]: { ...cur, comments: [...cur.comments, newComment] } };
    });
    setCommentText('');
  }

  const levelColors: Record<string, string> = {
    'Easy': 'bg-green-600/20 text-green-400 border-green-600/30',
    'Medium': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
    'Hard': 'bg-red-600/20 text-red-400 border-red-600/30',
  };

  return (
    <div className="px-4 py-4 pb-20">
      <h2 className="text-xl font-black text-white mb-0.5">Naga Recipes</h2>
      <p className="text-sm text-zinc-500 mb-4">50 traditional recipes from 17 tribes · Social cooking</p>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, tribes, authors..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
        />
      </div>

      {/* Tribe filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3" style={{ scrollbarWidth: 'none' }}>
        {TRIBES.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTribe(t)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
              activeTribe === t ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex gap-2 mb-3">
        {['All', 'Easy', 'Medium', 'Hard'].map((l) => (
          <button
            key={l}
            onClick={() => setActiveLevel(l)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              activeLevel === l ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            {l === 'All' ? 'All Levels' : l}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-3 text-xs text-zinc-500">{filtered.length} recipes found</div>

      {/* Recipe grid - 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => {
            const isOpen = expanded === r.id;
            const favId = `recipe_${r.title}`;
            const isFav = isFavorite(favId);
            const downloaded = isDownloaded(r.title);
            const state = recipeState[r.id];

            return (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-32 bg-zinc-800 overflow-hidden cursor-pointer" onClick={() => setSelectedRecipe(r)}>
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  {/* Level badge */}
                  <span className={`absolute top-1.5 left-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded border ${levelColors[r.level]}`}>
                    {r.level}
                  </span>
                  {/* Favorite */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite({ id: favId, type: 'recipe', title: r.title, subtitle: `${r.tribe} · ${r.time}`, emoji: '🍳' });
                    }}
                    className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors ${
                      isFav ? 'bg-red-600/80 text-red-200' : 'bg-black/50 text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                  {/* Time */}
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] text-white/90 flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" /> {r.time}
                  </span>
                </div>

                {/* Info */}
                <div className="p-2.5 flex flex-col flex-1">
                  <div className="text-xs font-bold text-white leading-tight line-clamp-2 mb-1">{r.title}</div>
                  <div className="text-[10px] text-zinc-500 mb-1.5 flex items-center gap-1">
                    <Users className="w-2.5 h-2.5" /> {r.tribe} · by {r.author}
                  </div>

                  {/* Like & comment counts */}
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => handleLike(r.id)}
                      className={`flex items-center gap-1 text-[10px] font-semibold transition-colors ${
                        state.liked ? 'text-red-500' : 'text-zinc-500'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${state.liked ? 'fill-current' : ''}`} /> {state.likes}
                    </button>
                    <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                      <MessageCircle className="w-3 h-3" /> {state.comments.length}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 mt-auto">
                    <button
                      onClick={() => setSelectedRecipe(r)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] font-bold bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                      <ChefHat className="w-3 h-3" /> Cook
                    </button>
                    <button
                      onClick={() => toggleDownload(r.title)}
                      className={`flex items-center justify-center rounded-lg py-1.5 px-2 text-[10px] font-bold border transition-colors ${
                        downloaded ? 'bg-green-600/10 border-green-600/30 text-green-500' : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                      }`}
                    >
                      <Download className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => addToCart(r.title)}
                      className="flex items-center justify-center rounded-lg py-1.5 px-2 text-[10px] font-bold border bg-zinc-800 border-zinc-700 text-zinc-400"
                    >
                      <ShoppingCart className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm text-zinc-600">No recipes found. Try different filters.</div>
      )}

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeDetailModal
            recipe={selectedRecipe}
            state={recipeState[selectedRecipe.id]}
            commentText={commentText}
            setCommentText={setCommentText}
            onLike={() => handleLike(selectedRecipe.id)}
            onComment={() => handleComment(selectedRecipe.id)}
            onClose={() => setSelectedRecipe(null)}
            isFav={isFavorite(`recipe_${selectedRecipe.title}`)}
            onToggleFav={() => toggleFavorite({ id: `recipe_${selectedRecipe.title}`, type: 'recipe', title: selectedRecipe.title, subtitle: `${selectedRecipe.tribe} · ${selectedRecipe.time}`, emoji: '🍳' })}
            downloaded={isDownloaded(selectedRecipe.title)}
            onDownload={() => toggleDownload(selectedRecipe.title)}
            onAddToCart={() => addToCart(selectedRecipe.title)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RecipeDetailModal({
  recipe,
  state,
  commentText,
  setCommentText,
  onLike,
  onComment,
  onClose,
  isFav,
  onToggleFav,
  downloaded,
  onDownload,
  onAddToCart,
}: {
  recipe: Recipe;
  state: { likes: number; liked: boolean; comments: Comment[] };
  commentText: string;
  setCommentText: (s: string) => void;
  onLike: () => void;
  onComment: () => void;
  onClose: () => void;
  isFav: boolean;
  onToggleFav: () => void;
  downloaded: boolean;
  onDownload: () => void;
  onAddToCart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-800 w-full max-w-md max-h-[85vh] overflow-y-auto"
      >
        {/* Hero image */}
        <div className="relative h-52 bg-zinc-800">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <button onClick={onClose} className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-white">
            <X className="w-4 h-4" />
          </button>
          <button onClick={onToggleFav} className={`absolute top-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center ${isFav ? 'bg-red-600 text-white' : 'bg-black/60 text-white'}`}>
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
          {recipe.video && (
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-red-600/80 flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>
            </button>
          )}
        </div>

        <div className="p-4">
          {/* Title & meta */}
          <h3 className="text-lg font-black text-white mb-1">{recipe.title}</h3>
          <div className="flex items-center gap-3 mb-3 text-xs text-zinc-500">
            <span className="flex items-center gap-0.5"><Users className="w-3 h-3" /> {recipe.tribe}</span>
            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {recipe.time}</span>
            <span className="flex items-center gap-0.5"><Flame className="w-3 h-3" /> {recipe.level}</span>
          </div>
          <div className="text-[11px] text-zinc-500 mb-4">Recipe by <span className="text-white font-semibold">{recipe.author}</span></div>

          {/* Like & comment bar */}
          <div className="flex items-center gap-4 mb-4 pb-3 border-b border-zinc-800">
            <button onClick={onLike} className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${state.liked ? 'text-red-500' : 'text-zinc-400'}`}>
              <Heart className={`w-4 h-4 ${state.liked ? 'fill-current' : ''}`} /> {state.likes}
            </button>
            <span className="flex items-center gap-1.5 text-sm text-zinc-400">
              <MessageCircle className="w-4 h-4" /> {state.comments.length}
            </span>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-wide mb-2 flex items-center gap-1">
              <ChefHat className="w-3 h-3" /> Ingredients
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recipe.ingredients.map((ing) => (
                <span key={ing} className="text-[11px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="mb-4">
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-wide mb-2">Cooking Steps</div>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-[10px] font-bold text-red-500 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-xs text-zinc-400 leading-relaxed block">{step.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={onDownload}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold border transition-colors ${
                downloaded ? 'bg-green-600/10 border-green-600/30 text-green-500' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" /> {downloaded ? 'Saved Offline' : 'Save Offline'}
            </button>
            <button
              onClick={onAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold border bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
            </button>
          </div>

          {/* Comments section */}
          <div className="border-t border-zinc-800 pt-4">
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide mb-3 flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> Comments ({state.comments.length})
            </div>

            {/* Comment input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onComment(); }}
                placeholder="Add a comment..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
              />
              <button
                onClick={onComment}
                disabled={!commentText.trim()}
                className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white disabled:opacity-30 transition-opacity shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Comments list */}
            <div className="space-y-2.5">
              {state.comments.map((c) => (
                <div key={c.id} className="bg-zinc-800/50 rounded-lg p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-white">{c.user}</span>
                    <span className="text-[9px] text-zinc-600">{c.time}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{c.text}</p>
                </div>
              ))}
              {state.comments.length === 0 && (
                <p className="text-xs text-zinc-600 text-center py-2">Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
