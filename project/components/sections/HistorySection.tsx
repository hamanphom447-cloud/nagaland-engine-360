'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Clock, MapPin, Users, Calendar, RefreshCw, Plus, X, Share2,
  History as HistoryIcon, BookOpen, Feather, Music, Shirt, Utensils, Image as ImageIcon,
} from 'lucide-react';
import { useApp } from '../AppContext';

type Tribe = {
  name: string;
  population: string;
  district: string;
  language: string;
  festival: string;
  image: string;
  description: string;
  history: string;
  culture: string;
  food: string;
  dress: string;
};

type HistoryEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tribe?: string;
  category: 'Ancient' | 'British' | 'Independence' | 'Statehood' | 'Modern' | 'Tribe';
  author: string;
  dateAdded: string;
};

const HIST_IMG = [
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
  'https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?w=600',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
];

const TRIBE_IMG = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
  'https://images.unsplash.com/photo-1517457373954-a4470495b552?w=600',
  'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=600',
];

const HISTORY_DATA: HistoryEvent[] = [
  { id: '1', year: '~1000 AD', title: 'Origin of Naga Tribes - Migration from Yunnan', description: 'Naga tribes migrated from Yunnan, China through Myanmar to present-day Nagaland over centuries.', longDescription: 'The Naga tribes belong to the Tibeto-Burman linguistic family, with origins tracing back to the Yunnan province of China. Over many centuries, these tribes migrated southward through Myanmar (Burma) and eventually settled in the lush, mountainous terrain of present-day Nagaland. Each tribe developed its own distinct origin story. The Ao believe their ancestors emerged from Chungliyimti, a legendary six-stone site. The Angami trace their origin to Khezhakeno, a sacred lake. The Konyak claim descent from a single ancestor at Mon. The migration was gradual, with tribes settling in different valleys and ridges, leading to the incredible diversity of 16 major tribes across 16 districts, each with unique dialects, customs, and clan structures despite shared ancestral roots.', image: HIST_IMG[0], category: 'Ancient', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '2', year: '1228', title: 'Ahom Contact with Nagas', description: 'First recorded contact between the Ahom Kingdom and Naga tribes established tributary relations.', longDescription: 'When the Ahom dynasty established its kingdom in Assam in 1228 under Sukapha, they encountered the Naga tribes in the bordering hills. The Ahoms maintained a complex relationship with the Nagas, involving both trade and tributary arrangements. Naga tribes would pay tribute in the form of cotton, ivory, and forest produce, while the Ahoms provided salt and manufactured goods. Some Naga tribes served as mercenaries in Ahom armies. This relationship allowed the Nagas to maintain autonomy while engaging in limited trade with the plains. The Ahom chronicles, known as Buranjis, contain numerous references to Naga tribes, providing some of the earliest written records of Naga society and customs.', image: HIST_IMG[1], category: 'Ancient', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '3', year: '1826', title: 'British Annexation after Treaty of Yandabo', description: 'After the Anglo-Burmese War, the British took control of the Naga Hills following the Treaty of Yandabo.', longDescription: 'The Treaty of Yandabo (1826) ended the First Anglo-Burmese War and placed the Naga Hills under British influence. The British gradually expanded their administrative control over the Naga territories, initially treating them as part of Assam. This marked the beginning of sustained European contact with the Naga tribes. The British were both fascinated and challenged by the fierce independence of the Nagas. Early British administrators like Francis Jenkins and Captain John Butler documented Naga customs, but their attempts to establish control met with significant resistance. The British colonial period fundamentally altered Naga society through the introduction of Christianity, formal education, and modern governance structures, while also suppressing practices like headhunting.', image: HIST_IMG[2], category: 'British', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '4', year: '1832', title: 'British Expedition to Naga Hills', description: 'First formal British military expedition into the Naga Hills led by Captain Jenkins and Pemberton.', longDescription: 'In 1832, Captain Jenkins and Lieutenant Pemberton led the first formal British expedition into the Naga Hills. Their mission was to explore the region and establish a route connecting Assam with Manipur. The expedition encountered fierce resistance from Naga tribes, particularly the Angami, who ambushed the British forces. Despite superior weaponry, the British found the mountainous terrain and guerrilla tactics of the Nagas extremely challenging. This expedition marked the beginning of decades of British military campaigns to subdue the Naga Hills. The reports from this expedition provided the British with their first detailed knowledge of Naga geography, tribal territories, and social structures, setting the stage for future administrative and military actions.', image: HIST_IMG[1], category: 'British', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '5', year: '1879', title: 'Battle of Khonoma - Angami Resistance', description: 'Angami warriors from Khonoma village fought the British for two years in one of the fiercest Naga resistances.', longDescription: 'The Battle of Khonoma (1879-1881) was one of the most significant Naga resistances against British colonial rule. It began when Angami warriors from Khonoma village, led by their charismatic leader, killed the British Political Agent G.H. Damant and several of his escorts at Khonoma. The British retaliated with massive military force, sending several expeditions against the village. The Khonoma warriors, fortified in their stone-built village perched on a hilltop, resisted the British for nearly two years using sophisticated fortifications, stone barricades, and guerrilla warfare. The village was eventually captured and partially destroyed, but the resistance became legendary. Khonoma is now known as the first green village in Asia, and the battle is celebrated as a symbol of Naga courage and resistance against colonial power. The British eventually established control but with a new respect for Naga fighting capabilities.', image: HIST_IMG[2], category: 'British', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '6', year: '1881', title: 'Kohima Founded as British Headquarters', description: 'Kohima was established as the British administrative headquarters for the Naga Hills district.', longDescription: 'Following the pacification of the Angami resistance, the British established Kohima as the administrative headquarters of the Naga Hills district in 1881. Kohima was chosen for its strategic location atop a ridge at approximately 1,444 meters elevation, offering a cool climate and commanding views of the surrounding hills. The British built their administrative offices, residences, and a garrison here. Kohima became the center of British interaction with the Naga tribes, where political agents managed relations, collected tribute, and administered justice. The establishment of Kohima also brought missionaries, educators, and traders to the region, accelerating the social and cultural transformation of Naga society. This laid the foundation for Kohima becoming the capital of Nagaland after statehood.', image: HIST_IMG[1], category: 'British', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '7', year: '1944', title: 'Battle of Kohima - WWII Turning Point', description: 'The Battle of Kohima was a decisive WWII engagement where British and Indian forces halted the Japanese advance into India.', longDescription: 'The Battle of Kohima (April-June 1944) was one of the most critical battles of World War II and is often called the "Stalingrad of the East." Japanese forces, advancing through Burma with the Indian National Army, aimed to invade India through Kohima. The battle centered around the Deputy Commissioner\'s bungalow and its tennis court, where some of the bloodiest close-quarters fighting of the entire war occurred. The British and Indian forces, initially outnumbered, held the ridge against ferocious Japanese assaults until reinforcements arrived. The battle then turned into a gruelling counter-offensive that pushed the Japanese back into Burma. The Kohima War Cemetery, maintained by the Commonwealth War Graves Commission, now stands as a memorial to the 1,420 Allied soldiers who died here. The famous Kohima Epitaph reads: "When you go home, tell them of us and say, for your tomorrow, we gave our today." This battle is widely regarded as the turning point of the Burma Campaign.', image: HIST_IMG[2], category: 'British', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '8', year: '1947', title: 'Naga Independence Declaration', description: 'The Naga National Council declared Naga independence on August 14, 1947, one day before Indian independence.', longDescription: 'On August 14, 1947, the Naga National Council (NNC), led by A.Z. Phizo, declared Naga independence, one day before India became independent. The NNC claimed that the Nagas, never having been fully integrated into British India, had the right to self-determination. This declaration was sent to the United Nations but was not recognized by India or the international community. The event marked the beginning of one of South Asia\'s longest-running political conflicts. The Indian government maintained that Nagaland was an integral part of India, while Naga nationalist groups pursued varying degrees of sovereignty. This declaration remains a deeply significant event for Naga political identity, and August 14 is still observed by many Naga groups as Naga Independence Day.', image: HIST_IMG[0], category: 'Independence', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '9', year: '1952', title: 'First Naga Elections Boycott', description: 'Naga nationalist groups boycotted India\'s first general elections in the Naga Hills.', longDescription: 'In 1952, during India\'s first general elections, Naga nationalist groups called for a complete boycott in the Naga Hills. The boycott was largely successful, with very low voter turnout reflecting the widespread sentiment for independence among the Nagas. This was one of the earliest demonstrations of the political will of the Naga nationalist movement. The boycott also signaled to the Indian government the depth of Naga aspirations for self-determination. The period saw growing tensions between Naga nationalists and the Indian state, leading to increasing militarization of the region. The boycott became a template for future political actions by Naga groups and underscored the complex relationship between Nagaland and the Indian Union.', image: HIST_IMG[1], category: 'Independence', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '10', year: '1954', title: 'Formation of Naga Hills Tuensang Area', description: 'The Naga Hills Tuensang Area (NHTA) was formed as a separate administrative unit within Assam.', longDescription: 'In 1954, the Indian government reorganized the administrative structure of the Naga territories by creating the Naga Hills Tuensang Area (NHTA), combining the Naga Hills district of Assam with the Tuensang Frontier Division of the North-East Frontier Agency (NEFA). This was an attempt to provide greater administrative autonomy to the Naga regions while keeping them within the Indian Union. The NHTA was given a measure of self-governance with a regional council. However, this arrangement did not satisfy Naga nationalist demands and was seen by many as an insufficient compromise. The NHTA was a transitional arrangement that eventually led to the creation of the state of Nagaland in 1963, following the 16-Point Agreement.', image: HIST_IMG[1], category: 'Independence', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '11', year: '1960', title: '16-Point Agreement', description: 'The historic 16-Point Agreement between Naga leaders and the Government of India paved the way for Nagaland statehood.', longDescription: 'The 16-Point Agreement of 1960 was a landmark accord between the Naga People\'s Convention (NPC), led by Dr. Imkongliba Ao, and the Government of India. The agreement outlined 16 points of understanding that formed the basis for the creation of Nagaland as a separate state within the Indian Union. Key provisions included the creation of a separate state, the inclusion of Tuensang region, special provisions under Article 371A of the Indian Constitution protecting Naga religious and social practices, customary law, and land ownership. The agreement also provided for a Governor with special responsibilities regarding law and order. Dr. Imkongliba Ao, a medical doctor turned statesman, played a crucial role in negotiating this agreement, though he was assassinated before seeing Nagaland become a state. The 16-Point Agreement remains the constitutional foundation of Nagaland\'s relationship with the Indian Union.', image: HIST_IMG[0], category: 'Statehood', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '12', year: '1963', title: 'Nagaland Becomes 16th State of India - 1st Dec 1963', description: 'Nagaland was inaugurated as the 16th state of India on December 1, 1963, with Kohima as its capital.', longDescription: 'On December 1, 1963, Nagaland became the 16th state of the Indian Union, the first and only state to be created through a political agreement rather than war or conflict. The state was inaugurated by President Dr. Sarvepalli Radhakrishnan in Kohima. P. Shilu Ao became the first Chief Minister of Nagaland. The creation of the state was a triumph of democratic negotiation and dialogue, fulfilling a long-standing aspiration of the Naga people for political recognition and self-governance within India. Kohima was designated as the state capital. The state initially comprised three districts: Kohima, Mokokchung, and Tuensang. Nagaland Day (December 1) is celebrated annually as the founding day of the state. The achievement of statehood was the result of years of political mobilization, negotiation, and the visionary leadership of the Naga People\'s Convention, which successfully bridged the gap between Naga aspirations and the Indian constitutional framework.', image: HIST_IMG[1], category: 'Statehood', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '13', year: '1975', title: 'Shillong Accord', description: 'The Shillong Accord was signed between the Indian government and Naga underground groups.', longDescription: 'The Shillong Accord of November 11, 1975, was signed between representatives of the Indian government and the Naga Federal Government and the Naga Federal Army. The agreement called for the acceptance of the Indian Constitution by the Naga underground groups, surrender of arms, and the cessation of armed resistance. In return, the government agreed to release prisoners and provide rehabilitation. While some Naga groups accepted the accord, others, notably the National Socialist Council of Nagaland (NSCN), rejected it and continued the armed struggle. The accord led to a temporary reduction in violence but also caused a split within the Naga nationalist movement. The Shillong Accord remains a controversial chapter in Naga political history, seen by some as a pragmatic compromise and by others as a betrayal of the Naga cause.', image: HIST_IMG[3], category: 'Modern', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '14', year: '1997', title: 'Ceasefire Agreement NSCN-IM', description: 'A historic ceasefire was agreed between the Government of India and the NSCN-IM, beginning a peace process.', longDescription: 'On August 1, 1997, a historic ceasefire agreement was reached between the Government of India and the National Socialist Council of Nagaland (Isak-Muivah faction), the largest armed Naga group. This ceasefire marked the beginning of the most sustained peace process in the Naga political conflict. The agreement provided for a cessation of hostilities, and subsequent rounds of political negotiations have continued for decades. The ceasefire has been extended repeatedly and has significantly reduced violence in the region. The peace talks have addressed core issues including Naga sovereignty, territorial integration of Naga-inhabited areas, and the special status of Nagaland. While a final settlement has remained elusive, the ceasefire and dialogue process has been a major step toward a peaceful resolution of one of South Asia\'s oldest political conflicts.', image: HIST_IMG[0], category: 'Modern', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '15', year: '2003', title: 'Formation of 11 New Districts', description: 'The Naga People\'s Front government created new administrative districts across Nagaland.', longDescription: 'In 2003, the Nagaland government, under the Naga People\'s Front, undertook a significant administrative reorganization by creating new districts to improve governance and bring administration closer to the people. This included carving out new districts from the existing larger ones to address the geographical challenges and ethnic diversity of the state. The creation of new districts was aimed at improving service delivery, reducing travel distances for citizens, and giving tribal communities greater administrative representation. This reorganization was part of a broader trend of decentralization in Nagaland\'s governance, recognizing the unique geography and tribal distribution of the state.', image: HIST_IMG[3], category: 'Modern', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '16', year: '2015', title: 'Framework Agreement Naga Peace', description: 'The Government of India and NSCN-IM signed the Framework Agreement for a final Naga political settlement.', longDescription: 'On August 3, 2015, the Government of India and the NSCN-IM signed the historic Framework Agreement in the presence of Prime Minister Narendra Modi. This agreement was described as a framework for a final political settlement of the Naga issue, which had been under negotiation since the 1997 ceasefire. The details of the agreement were not fully made public, but it was hailed as a major breakthrough. The agreement reportedly recognized the unique history and identity of the Naga people and proposed a relationship of "shared sovereignty" within the Indian Union. Subsequent negotiations have continued to work out the specifics of the final settlement, including issues of Naga territorial integration, a separate Naga flag and constitution, and financial autonomy. The Framework Agreement represents the most significant progress toward a political resolution of the Naga issue in decades.', image: HIST_IMG[0], category: 'Modern', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '17', year: '2018', title: 'First BJP Government in Nagaland', description: 'The BJP became part of the ruling coalition in Nagaland for the first time in 2018.', longDescription: 'In the 2018 Nagaland Legislative Assembly elections, the Bharatiya Janata Party (BJP) won 12 seats and formed a coalition government with the Nationalist Democratic Progressive Party (NDPP), led by Neiphiu Rio. This was significant as it marked the first time the BJP was part of the ruling government in Nagaland, a state with a predominantly Christian population. The alliance with the NDPP represented a new political configuration in Nagaland, moving away from the previous dominance of the Naga People\'s Front. The formation of this government also coincided with ongoing peace talks and was seen as reflecting the central government\'s increased engagement with Nagaland. The Rio-led government focused on infrastructure development, the peace process, and economic development while navigating the complex political landscape of the state.', image: HIST_IMG[3], category: 'Modern', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '18', year: '2021', title: 'Creation of 5 New Districts - Total 16 Districts', description: 'Nagaland expanded to 16 districts with the creation of five new administrative districts.', longDescription: 'In 2021, the Nagaland government created five new districts, bringing the total number of districts in the state to 16. The new districts were Niuland, Chumoukedima, Tseminyu, Shamator, and Noklak. This expansion was aimed at improving administrative efficiency and bringing governance closer to remote communities. Each new district was carved out from existing larger districts, reducing the geographical area and population that each district administration had to serve. The creation of these districts was particularly significant for tribal communities that had long demanded their own administrative units. With 16 districts and 16 major tribes, Nagaland achieved a unique alignment of administrative and ethnic geography. The new districts are expected to improve service delivery in education, healthcare, and infrastructure, especially in previously underserved areas.', image: HIST_IMG[0], category: 'Modern', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '19', year: '2023', title: 'Hornbill Festival 24th Edition', description: 'The 24th edition of the Hornbill Festival celebrated Naga culture with global participation.', longDescription: 'The 24th edition of the Hornbill Festival, held in December 2023 at Kisama Heritage Village near Kohima, was a grand celebration of Naga culture and heritage. Known as the "Festival of Festivals," the Hornbill Festival brings together all 17 Naga tribes for a week-long showcase of traditional dance, music, food, sports, and crafts. The 2023 edition featured performances by all major tribes, traditional morung displays, indigenous games, the famous Naga King Chili eating competition, and the Hornbill National Rock Contest. The festival attracted thousands of domestic and international tourists, contributing significantly to Nagaland\'s tourism economy. The event also served as a platform for promoting Naga handicrafts, textiles, and cuisine. The Hornbill Festival has become Nagaland\'s most important cultural export and a symbol of Naga unity and pride.', image: HIST_IMG[0], category: 'Modern', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '20', year: '2024', title: 'Nagaland Statehood Day 61st', description: 'Nagaland celebrated its 61st Statehood Day on December 1, 2024.', longDescription: 'Nagaland celebrated its 61st Statehood Day on December 1, 2024, commemorating the day in 1963 when it became the 16th state of the Indian Union. The celebrations included official ceremonies at the Secretariat Plaza in Kohima, cultural performances by various tribes, and tributes to the founding leaders of the state. The occasion was also marked by reflections on the progress made and challenges remaining, particularly the ongoing Naga political dialogue and the aspiration for a final peace settlement. The 61st Statehood Day highlighted Nagaland\'s journey from a frontier territory to a modern Indian state, while acknowledging the continuing importance of preserving Naga cultural identity, traditions, and the unique constitutional status of the state under Article 371A.', image: HIST_IMG[1], category: 'Modern', author: 'NE360', dateAdded: '2024-01-01' },
  { id: '21', year: '2025', title: 'Naga Peace Accord Negotiations Progress', description: 'Fresh rounds of peace talks between NSCN-IM and the Government of India resumed in early 2025.', longDescription: 'In early 2025, renewed rounds of peace negotiations between the NSCN-IM and the Government of India brought fresh hope for a final Naga political settlement. The talks focused on unresolved issues including the Naga national flag, a separate constitution (Yehzabo), and the territorial integration of Naga-inhabited areas. Both sides expressed commitment to finding a mutually acceptable solution within the framework of the 2015 Framework Agreement. The negotiations also involved consultations with various Naga tribal organizations and civil society groups to build consensus. The progress in 2025 was seen as a positive sign after years of stalled negotiations, though key differences remained on the issues of sovereignty and territorial integration.', image: HIST_IMG[3], category: 'Modern', author: 'NE360', dateAdded: '2025-03-15' },
  { id: '22', year: '2025', title: 'Kohima Smart City Infrastructure Milestone', description: 'Kohima Smart City project completed major infrastructure upgrades including new road networks and digital services.', longDescription: 'The Kohima Smart City project reached a significant milestone in 2025 with the completion of major infrastructure upgrades. The project, part of India\'s Smart Cities Mission, included the development of new road networks, improved water supply systems, smart street lighting, and digital governance services. The heritage town of Kohima saw the restoration of historical sites, the creation of public spaces, and the introduction of digital citizen services. The Smart City initiative also focused on sustainable urban development, incorporating green spaces and improved waste management. These developments aimed to modernize Kohima while preserving its historical and cultural character, making it more livable for residents and attractive for visitors.', image: HIST_IMG[1], category: 'Modern', author: 'NE360', dateAdded: '2025-06-20' },
  { id: '23', year: '2025', title: 'Nagaland Organic Farming Certification', description: 'Nagaland achieved major organic farming certifications across multiple districts.', longDescription: 'In 2025, Nagaland made significant strides in organic farming, with large areas of agricultural land receiving organic certification. The state\'s traditional farming practices, which had always been largely organic due to the absence of chemical fertilizers and pesticides in remote areas, were formally certified. This opened up new markets for Naga agricultural products, including King Chili, Naga cucumber, and various organic rice varieties. The certification was part of the state government\'s push to promote organic agriculture as a sustainable economic model. The initiative also included training programs for farmers and the establishment of organic produce cooperatives. Nagaland\'s organic farming movement is closely tied to its cultural values of living in harmony with nature, as embodied in traditional jhum cultivation practices.', image: HIST_IMG[3], category: 'Modern', author: 'NE360', dateAdded: '2025-09-10' },
  { id: '24', year: '2026', title: 'Hornbill Festival 25th Edition Announced', description: 'The 25th anniversary edition of the Hornbill Festival was announced with expanded cultural programs.', longDescription: 'The 25th edition of the Hornbill Festival, scheduled for December 2026, was announced with expanded cultural programs and international collaborations. This silver jubilee edition was planned to be the biggest yet, with invitations extended to indigenous communities from around the world to participate. The festival aimed to celebrate 25 years of the Hornbill Festival while showcasing the richness and diversity of Naga tribal culture. New additions included a global indigenous peoples\' conclave, expanded rock music events, and a focus on sustainable tourism. The 25th edition also planned to highlight the progress of the Naga peace process and the vision for Nagaland\'s future. Organizers expected record participation from both domestic and international visitors, cementing the Hornbill Festival\'s status as one of India\'s premier cultural events.', image: HIST_IMG[0], category: 'Modern', author: 'NE360', dateAdded: '2026-01-15' },
  { id: '25', year: '2026', title: 'Nagaland Startup Mission Launch', description: 'The Nagaland Startup Mission was launched to promote entrepreneurship among Naga youth.', longDescription: 'In early 2026, the Nagaland Startup Mission was officially launched to foster entrepreneurship and innovation among Naga youth. The mission provided seed funding, mentorship, incubation facilities, and training for young entrepreneurs across the state. Focus areas included agri-tech, eco-tourism, handicrafts e-commerce, and digital services. The initiative aimed to address the challenge of youth unemployment and migration by creating local economic opportunities. The Startup Mission also partnered with national incubators and private investors to connect Naga entrepreneurs with broader markets. This was part of a broader vision to transform Nagaland\'s economy from one dependent on government employment to one driven by private enterprise and innovation, while leveraging the state\'s unique cultural and natural resources.', image: HIST_IMG[3], category: 'Modern', author: 'NE360', dateAdded: '2026-02-01' },
  { id: 't1', year: '~1000 AD', title: 'Konyak Headhunting Tradition', description: 'The Konyak tribe practiced headhunting until the 1960s, with facial tattoos marking warriors\' achievements.', longDescription: 'The Konyak tribe of Mon district is perhaps the most internationally recognized Naga tribe due to their historic practice of headhunting. Konyak warriors believed that taking heads in battle brought prosperity to the village and spiritual power to the warrior. Successful headhunters were rewarded with facial tattoos, which served as marks of honor and bravery. The practice was deeply intertwined with Konyak spiritual beliefs, agricultural fertility, and social status. Headhunting was officially banned by the Indian government, and by the 1960s the practice had largely ceased with the spread of Christianity. Today, the last surviving headhunters, now elderly men with tattooed faces, are revered as living links to a bygone era. Their stories and tattoos have become important cultural heritage, preserved through photography and oral history.', image: HIST_IMG[0], tribe: 'Konyak', category: 'Tribe', author: 'NE360', dateAdded: '2024-01-01' },
];

const TRIBES: Tribe[] = [
  { name: 'Ao', population: '231,000', district: 'Mokokchung', language: 'Chungli & Mongsen', festival: 'Moatsu', image: TRIBE_IMG[0], description: 'The Ao Nagas are one of the most prominent Naga tribes, primarily inhabiting Mokokchung district. Known as pioneers of modern education among Nagas, the Ao were the first to embrace Christianity and formal education in the late 19th century. They have a rich literary tradition and have produced many distinguished scholars, bureaucrats, and political leaders.', history: 'The Ao people trace their origins to Chungliyimti, a legendary site of six stones from which their ancestors emerged. From there, they spread across the Mokokchung plateau, establishing villages on hilltops for defense. The Ao were among the first Naga tribes to encounter Baptist missionaries in the 1870s, with Reverend Edward Winter Clark establishing the first mission at Molungkimong in 1876. This early contact with Christianity and education profoundly shaped Ao society, making them leaders in literacy and political mobilization. The Ao played a central role in the Naga People\'s Convention and the 16-Point Agreement, with Dr. Imkongliba Ao being a key architect of Nagaland statehood. The Ao also developed one of the earliest Naga scripts and literary traditions.', culture: 'Ao culture is deeply rooted in community life, centered around the morung (bachelor dormitory) system where young men received education in crafts, warfare, and community values. The Moatsu festival, celebrated in May after sowing seeds, is the most important Ao festival, marked by singing, dancing, and community feasting. Traditional Ao dances include the War Dance and the Moatsu dance, performed in colorful shawls. Ao folklore is rich with stories of Longkumer, Pongen, and Jamir clans. Music is integral, with log drums and folk songs accompanying every major event. The Ao are also known for their intricate woodcarving and craftsmanship.', food: 'The Ao diet centers on rice, smoked pork, and foraged vegetables. Signature dishes include smoked pork with bamboo shoot, anishi (dried taro leaf curry), and various chutneys made with fermented soybean (akhor) and king chili. Sticky rice is a staple, often cooked in bamboo tubes. The Ao also brew rice beer, known as dzutse, for festivals and ceremonies.', dress: 'Ao traditional attire is distinguished by the beautiful Tsungkotepsu, a warrior shawl with motifs of tiger, elephant, human head, and other symbols woven into a black base. Men wear kilts and shawls, while women wear wrap-around skirts with distinctive patterns. The Ao use red and white cotton thread extensively. During Moatsu, women adorn themselves with traditional jewelry including beads and brass ornaments.' },
  { name: 'Angami', population: '152,000', district: 'Kohima', language: 'Tenyidie', festival: 'Sekrenyi', image: TRIBE_IMG[1], description: 'The Angami are one of the largest and most politically influential Naga tribes, inhabiting the Kohima district and surrounding areas. Known for their terraced rice cultivation, the Angami have transformed steep hillsides into productive agricultural landscapes. Kohima, the state capital, sits in the heart of Angami territory.', history: 'The Angami trace their origin to Khezhakeno, a sacred lake believed to be the birthplace of their ancestors. They established powerful villages like Khonoma, Jotsoma, and Kohima village, which became centers of resistance against British incursion. The Battle of Khonoma (1879-1881) is the most celebrated episode of Angami military history. The Angami were also at the forefront of the Naga nationalist movement, with leaders like A.Z. Phizo, an Angami from Khonoma, leading the Naga National Council. The Angami\'s strategic location around Kohima placed them at the center of both the WWII Battle of Kohima and the subsequent political developments leading to Nagaland statehood. Their adoption of Christianity was significant, and the Angami Baptist Church has been a powerful social and political force.', culture: 'Angami culture emphasizes community harmony and elaborate social rituals. The Sekrenyi festival, celebrated in February, is a purification festival marking the new year, involving ritual washing, feasting, and dancing. The Angami are renowned for their terraced farming, creating engineering marvels on steep hillsides. Traditional Angami dances include the Lyangta and the War Dance. Folklore includes stories of the spirit world and the legendary warrior Kelhoukeviira. The Angami are also known for their skilled craftsmanship in bamboo and cane work, and for their intricate weaving patterns that carry clan-specific meanings.', food: 'Angami cuisine features galho (a rice and meat stew), smoked pork with anise leaves, and various fermented food preparations. The Angami are particularly known for their use of dried and fermented vegetables, including fermented soybean (akehuni) and fermented bamboo shoot. Bushmeat, including wild boar and venison, is traditionally consumed. Rice beer is brewed for festivals and social occasions.', dress: 'Angami traditional dress is characterized by the Lohe, a red and black shawl with white bands, worn by men who have performed the mithun sacrifice. Women wear lohe-nyi (wrap skirts) with distinctive patterns. The Angami also use elaborate headgear with hornbill feathers for ceremonial occasions. During Sekrenyi, both men and women wear their finest traditional attire, adorned with beads, ivory armlets, and brass ornaments.' },
  { name: 'Sumi', population: '242,000', district: 'Zunheboto', language: 'Sumi', festival: 'Tuluni', image: TRIBE_IMG[2], description: 'The Sumi (also called Sema) are a warrior tribe primarily inhabiting Zunheboto district. Known for their martial traditions and agricultural prowess, the Sumi have played significant roles in Naga political history. They are one of the largest Naga tribes by population.', history: 'The Sumi trace their origins to a legendary ancestor who emerged from the earth at a site near present-day Zunheboto. The Sumi were known as fierce warriors, and their villages were heavily fortified. During the British period, the Sumi resisted colonial incursions, and later became deeply involved in the Naga nationalist movement. The Sumi produced prominent Naga leaders including Kughato Sumi, a key figure in the Naga National Council. The Sumi territory in Zunheboto became a stronghold of the Naga underground movement. Christianity arrived among the Sumi in the early 20th century and transformed many social practices, though traditional customs were selectively retained. Today, the Sumi remain influential in Nagaland politics and the Baptist church.', culture: 'Sumi culture is vibrant and deeply communal. The Tuluni festival, celebrated in July, is the most important Sumi festival, marking the bounty of the agricultural season with feasting, singing, and dancing. Sumi folk dances are energetic and often performed in large groups, with synchronized movements and rhythmic chanting. The Sumi have a rich oral tradition, with folktales and legends passed down through generations. Music plays a central role, with traditional instruments including the log drum and mouth organ. The morung system was central to Sumi education, teaching young people crafts, warfare, and social values.', food: 'Sumi cuisine is famous for its use of axone (akhuni), fermented soybean paste that is a signature ingredient in many Naga dishes. Pork with axone is perhaps the most iconic Sumi dish. Other specialties include smoked pork, dried fish chutney, and various preparations with king chili. Rice is the staple, accompanied by seasonal vegetables and foraged greens. Rice beer, called rotse, is brewed for festivals.', dress: 'Sumi traditional attire features the Akhakhi, a distinctive warrior shawl with patterns indicating the wearer\'s achievements. Men wear kilts with elaborate headgear, while women wear wrap-around skirts with geometric patterns. The Sumi use black, red, and white prominently in their textiles. During Tuluni, women wear elaborate jewelry including bead necklaces, brass armlets, and traditional headdresses, while men carry dao (machete) and spears as part of ceremonial dress.' },
  { name: 'Lotha', population: '118,000', district: 'Wokha', language: 'Lotha', festival: 'Tokhu Emong', image: TRIBE_IMG[3], description: 'The Lotha tribe primarily inhabits Wokha district, known for its scenic Doyang river valley and abundant orange orchards. The Lotha are skilled agriculturists and have a rich tradition of folk music and community celebrations.', history: 'The Lotha people believe their ancestors migrated from the southeast, settling in the Wokha region centuries ago. They established villages in the hills surrounding the Doyang valley, developing a society based on agriculture and clan affiliations. The Lotha came under British administration in the late 19th century and adopted Christianity in the early 20th century. The Lotha have been active in Nagaland\'s political life, contributing leaders to both the state government and the Naga nationalist movement. The discovery of oil in the Lotha-inhabited Wokha district in the 19th century by the British was significant, though commercial exploitation was limited. Today, the Doyang river dam and hydropower project are major infrastructure developments in Lotha territory.', culture: 'Lotha culture is celebrated through the Tokhu Emong festival, held in November to mark the end of the harvest season. It is a time of thanksgiving, community bonding, and renewal. Lotha folk dances include the energetic group dances performed during Tokhu Emong, with participants wearing colorful traditional attire. The Lotha have a rich tradition of folk songs that narrate stories of love, war, and daily life. Crafts include bamboo weaving, pottery, and the making of traditional ornaments. The Lotha are also known for their cultivation of oranges, which are celebrated for their sweetness and are an important economic crop.', food: 'Lotha cuisine includes bamboo-steamed fish, pork with fermented bamboo shoot, and various preparations with king chili. The Lotha use fresh river fish from the Doyang extensively. Oranges from Wokha are a celebrated food item, eaten fresh and also used in salads and preserves. Traditional Lotha meals are simple but flavorful, with rice, smoked meat, and foraged vegetables forming the core.', dress: 'Lotha traditional dress features the shenpheu, a distinctive shawl with geometric patterns. Women wear wrap-around skirts with elaborate designs, while men wear kilts and shawls. The Lotha use natural dyes in their textiles, creating patterns in black, red, and white. During Tokhu Emong, both men and women wear their finest traditional attire, adorned with beads, cowrie shells, and brass ornaments.' },
  { name: 'Konyak', population: '85,000', district: 'Mon', language: 'Konyak', festival: 'Aoling', image: TRIBE_IMG[4], description: 'The Konyak are the largest of the Naga tribes in Mon district and are internationally famous as former headhunters. The tattooed faces of elderly Konyak warriors are among the most iconic images of Nagaland. The Konyak maintained a powerful chieftain system unique among Naga tribes.', history: 'The Konyak trace their origin to a single ancestor at Mon, and their oral history speaks of migrations from the east. The Konyak developed a highly organized political system with hereditary chiefs (Anghs), who ruled over confederations of villages. This chieftain system is unique among Naga tribes. Headhunting was central to Konyak society until the mid-20th century, tied to spiritual beliefs about fertility and power. The practice was suppressed through British and later Indian administration, combined with the spread of Christianity. The last recorded headhunting incidents occurred in the 1960s. Today, the surviving headhunters, with their facial tattoos, are revered elders. The Konyak Anghs still hold significant social authority, and the institution of chieftainship continues to play a role in Konyak governance alongside modern democratic structures.', culture: 'Konyak culture is perhaps the most visually striking of all Naga tribes. The Aoling festival, celebrated in April, marks the Konyak new year with elaborate rituals, feasting, and dancing. Konyak warriors traditionally wore elaborate headdresses with hornbill feathers, animal tusks, and human hair. The facial tattoos, given to warriors who had taken heads, are the most distinctive cultural markers. Konyak craftsmanship includes exceptional woodcarving, particularly of human and animal figures, and the creation of ornate weaponry. Log drums, carved from single tree trunks, are central to village life. The morung system was particularly elaborate among the Konyak, serving as training grounds for young warriors.', food: 'Konyak cuisine includes smoked beef with king chili, wild boar preparations, and various foraged foods. The Konyak are known for their use of smoked and dried meats, preserved for long periods. Opium, traditionally cultivated and consumed by Konyak elders, has been part of their culture, though its use is now discouraged. Rice, millet, and various tubers form the carbohydrate base, supplemented by bushmeat and forest vegetables.', dress: 'Konyak traditional dress is the most dramatic among Naga tribes. Men wear elaborate headgear decorated with hornbill feathers, wild boar tusks, and animal fur. The facial tattoos, made using thorns and plant dye, are the signature mark of Konyak warriors. Men wear woven armlets, necklaces of beads and animal teeth, and carry dao and spears. Women wear wrap-around skirts with distinctive patterns and bead necklaces. During Aoling, warriors don full traditional regalia, including feathered headdresses and animal skin wraps.' },
  { name: 'Chakhesang', population: '98,000', district: 'Phek', language: 'Chokri, Khezha & Sangtam', festival: 'Sukrunye', image: TRIBE_IMG[0], description: 'The Chakhesang are a composite tribe formed from three sub-tribes: Chakri, Khezha, and Sangtam, primarily inhabiting Phek district. Known for their intricate weaving and agricultural terraces, the Chakhesang are among the most culturally rich Naga tribes.', history: 'The Chakhesang are a relatively newer tribal identity, formed from the amalgamation of Chakri (Chokri), Khezha (Kheza), and Sangtam sub-groups. Their origins trace to the Phek region, where they established villages with sophisticated agricultural systems. The Chakhesang were among the later Naga tribes to convert to Christianity, and many traditional practices were retained longer. The Chakhesang played a role in the Naga nationalist movement and have contributed leaders to Nagaland politics. The Phek district, with its scenic landscapes and traditional villages, has become an important cultural tourism destination. The Chakhesang have also been known for their progressive approach to community conservation, with villages like Zhavame implementing sustainable forestry practices.', culture: 'Chakhesang culture is celebrated through the Sukrunye festival, a cleansing and purification festival held in January. The festival involves ritual cleansing, community feasting, and traditional sports. Chakhesang folk dances are elaborate, with synchronized group movements and traditional attire. The tribe is particularly renowned for its weaving, producing some of the finest Naga textiles with intricate patterns that carry deep symbolic meanings. Crafts include basketry, pottery, and woodcarving. The Chakhesang oral tradition is rich with stories of spirits, heroes, and the origins of their sub-tribes.', food: 'Chakhesang cuisine features pork with anise leaves, nut paste curry made from job\'s tears, and various preparations with king chili. The Chakhesang use a wide range of foraged vegetables and forest products. Rice is the staple, grown on beautifully terraced hillsides. Traditional Chakhesang meals are communal, often shared during festivals and village gatherings. Rice beer is brewed for ceremonies.', dress: 'Chakhesang traditional dress is distinguished by the Rasingkhim, a shawl with elaborate patterns woven by women. The Chakhesang are considered among the finest weavers in Nagaland, with patterns that can take months to complete. Women wear wrap-around skirts with geometric designs, while men wear shawls that indicate their social status. Beadwork, cowrie shells, and brass ornaments complete the traditional ensemble. During Sukrunye, the finest textiles are worn as a mark of pride.' },
  { name: 'Zeme', population: '54,000', district: 'Peren', language: 'Zeme', festival: 'Hega', image: TRIBE_IMG[1], description: 'The Zeme (also spelled Zeliang) are part of the Zeliangrong people, inhabiting Peren district. Known for the Heraka religious movement led by Haija Pieu and later Gaidinliu, the Zeme have a unique spiritual tradition among Naga tribes.', history: 'The Zeme are part of the Zeliangrong Naga confederation (Zeme, Liangmai, Rongmei), with roots in the Peren region. The Zeme are unique among Naga tribes for the Heraka movement, a socio-religious reform movement that began in the 1920s under the leadership of Haija Pieu and was later led by the legendary Gaidinliu, who fought against British rule and was imprisoned at age 16. Gaidinliu was released after Indian independence and received recognition from Prime Minister Jawaharlal Nehru, who called her "Rani of the Nagas." The Heraka movement promoted a return to traditional Naga religious practices while reforming social customs. The Zeme have maintained a dual religious identity, with many following Christianity while others preserve the Heraka tradition. The Zeme also played a role in the broader Naga political movement.', culture: 'Zeme culture is deeply connected to the Hega festival, a celebration of love and courtship held in February. The festival involves traditional games, folk songs, and dance performances. Zeme folk dances include the graceful Hega dance performed by young women and the energetic war dance performed by men. The Zeme have a rich musical tradition with unique instruments. The Heraka religious tradition has preserved many ancient Naga spiritual practices, including worship of Tingwang (the supreme deity). Crafts include weaving, bamboo work, and the making of traditional ornaments.', food: 'Zeme cuisine includes bamboo shoot pickle, various pork preparations, and foraged vegetables. The Zeme use fermented foods extensively, including fermented bamboo shoot and soybean. Snail curry is a Zeme delicacy, reflecting their connection to the riverine environment. Rice, millet, and job\'s tears are staples, supplemented by bushmeat and forest produce. Rice beer is brewed for festivals.', dress: 'Zeme traditional dress features distinctive shawls with patterns in black, red, and white. Women wear wrap-around skirts with geometric designs, often featuring the unique Zeme diamond pattern. Men wear kilts and shawls, with headgear decorated with feathers and animal teeth. During Hega, young people wear their most elaborate traditional attire as part of courtship displays. Beadwork and brass ornaments are important accessories.' },
  { name: 'Rengma', population: '46,000', district: 'Tseminyu', language: 'Rengma', festival: 'Ngada', image: TRIBE_IMG[2], description: 'The Rengma are a smaller Naga tribe primarily inhabiting the newly created Tseminyu district. Known for their weaving traditions and agricultural practices, the Rengma have maintained a distinct cultural identity despite their smaller numbers.', history: 'The Rengma trace their origins to the same migratory routes as other Naga tribes, settling in the hills of what is now Tseminyu district. The Rengma were among the earlier Naga groups to interact with the British, given their proximity to the Assam plains. They maintained a clan-based social structure with village councils. Christianity arrived among the Rengma in the early 20th century. The Rengma were long administered as part of Kohima district, and the creation of Tseminyu as a separate district in 2021 was a significant milestone for Rengma political identity, fulfilling a long-standing demand for administrative recognition. The Rengma have contributed to Naga political life and the broader cultural landscape.', culture: 'Rengma culture is celebrated through the Ngada festival, held in November-December to mark the harvest. The festival involves community feasting, ritual cleansing, and traditional performances. Rengma folk dances are characterized by circular formations with synchronized movements. The Rengma are particularly known for their weaving, producing textiles with distinctive patterns that are different from other Naga tribes. Music and oral traditions are rich, with folk songs narrating stories of migration, love, and warfare. The morung system played a central role in transmitting cultural knowledge.', food: 'Rengma cuisine includes pork with ginger, fern curry, and various preparations with king chili. The Rengma use smoked and dried meats extensively. Foraged vegetables, including fern shoots and yam leaves, are important components of the diet. Rice is the staple, grown in both terraced and jhum fields. Rice beer is brewed for social occasions and festivals.', dress: 'Rengma traditional dress features distinctive shawls with geometric patterns in red, black, and white. Women wear wrap-around skirts with unique designs, while men wear kilts and shawls. The Rengma use natural dyes and have specific patterns for different social statuses. During Ngada, people wear their finest traditional attire, adorned with beads, cowrie shells, and brass ornaments.' },
  { name: 'Phom', population: '52,000', district: 'Longleng', language: 'Phom', festival: 'Phom Monyi', image: TRIBE_IMG[3], description: 'The Phom tribe primarily inhabits Longleng district and is known for their rich weaving traditions and the Phom Monyi festival. The Phom have maintained strong cultural traditions while embracing modern education and governance.', history: 'The Phom trace their origins to migratory ancestors who settled in the Longleng region. The Phom developed a society based on clan affiliations and village councils, with elaborate social hierarchies. The Phom came under British administration in the early 20th century, relatively later than some other Naga tribes. Christianity spread among the Phom in the mid-20th century, transforming many social practices while traditional customs were selectively preserved. The Phom have been active in Naga political life, contributing to both the state government and the Naga nationalist movement. The creation of Longleng as a separate district was a significant milestone for the Phom, providing greater administrative autonomy and recognition.', culture: 'Phom culture is celebrated through the Phom Monyi festival, a major event held in April marking the spring season. The festival involves ritual offerings, community feasting, and elaborate dance performances. Phom folk dances are energetic and communal, with large groups performing synchronized movements. The Phom are renowned for their weaving, producing textiles with distinctive patterns and colors. Music is integral to Phom life, with folk songs and log drums accompanying all major events. The morung system was central to Phom education, teaching crafts, social values, and community responsibilities.', food: 'Phom cuisine includes smoked pork ribs, mushroom curry, and various preparations with king chili. The Phom use wild mushrooms extensively, foraged from the forests around their villages. Smoked and dried meats are preserved for long-term use. Rice is the staple, grown in jhum fields. Traditional Phom meals are simple but flavorful, with emphasis on fresh, foraged ingredients. Rice beer is brewed for ceremonies.', dress: 'Phom traditional dress features distinctive shawls with patterns indicating social status. The Phom use a unique weaving technique that creates bold geometric designs. Women wear wrap-around skirts with colorful patterns, while men wear kilts and shawls. During Phom Monyi, people wear elaborate traditional attire adorned with beads, feathers, and brass ornaments. Headgear with hornbill feathers is worn by men of high status.' },
  { name: 'Chang', population: '64,000', district: 'Tuensang', language: 'Chang (Chang Naga)', festival: 'Naknyulem', image: TRIBE_IMG[4], description: 'The Chang tribe inhabits Tuensang district and is known for their storytelling traditions and the Naknyulem festival. The Chang have a rich cultural heritage with elaborate social customs and oral traditions.', history: 'The Chang trace their origins to ancestral migrations into the Tuensang region, one of the most remote and rugged parts of Nagaland. The Chang developed a society with elaborate social structures, including a complex system of clan relationships and village governance. The Chang came under British administration relatively late, and many traditional practices persisted longer than in more accessible areas. Christianity arrived in the mid-20th century, bringing significant social changes. The Chang have been active in Naga politics, particularly in the context of eastern Nagaland\'s development and political aspirations. Tuensang district, the largest in Nagaland, has been a key area for the Chang, and the tribe has advocated for greater development and infrastructure in the region.', culture: 'Chang culture is celebrated through the Naknyulem festival, held in August to invoke blessings for the community. The festival involves elaborate rituals, community feasting, and traditional games. Chang folk dances are dramatic and often tell stories through movement. The Chang are particularly known for their storytelling tradition, with rich oral literature including myths, legends, and moral tales. Music is central, with traditional instruments and folk songs accompanying all aspects of community life. Crafts include woodcarving, basketry, and weaving. The morung system was central to Chang education and social organization.', food: 'Chang cuisine includes pork curry with king chili, yam roast, and banana flower curry. The Chang use a variety of tubers and root vegetables, reflecting the agricultural diversity of Tuensang. Smoked and dried meats are preserved for lean seasons. Rice is the staple, grown in jhum fields. Traditional Chang meals emphasize communal eating, with food shared during village gatherings and festivals. Rice beer is brewed for ceremonies.', dress: 'Chang traditional dress features distinctive shawls with patterns in bold colors. The Chang use geometric designs that carry specific meanings related to clan identity and social status. Women wear wrap-around skirts with elaborate patterns, while men wear kilts and shawls. During Naknyulem, people wear their finest traditional attire, adorned with beads, feathers, and ornaments. The Chang are known for their elaborate headdresses decorated with animal parts and feathers.' },
  { name: 'Sangtam', population: '73,000', district: 'Kiphire', language: 'Sangtam', festival: 'Mongmong', image: TRIBE_IMG[0], description: 'The Sangtam tribe primarily inhabits Kiphire and Tuensang districts. Known for their Mongmong festival and rich folk traditions, the Sangtam have maintained a distinct cultural identity in eastern Nagaland.', history: 'The Sangtam trace their origins to ancestral migrations into the Kiphire and Tuensang regions. The Sangtam developed a society organized around clans and village councils, with elaborate systems of social obligations and ritual practices. The Sangtam came under British administration in the early 20th century and adopted Christianity in subsequent decades. The Sangtam have been active in Naga political life, and the creation of Kiphire as a separate district was an important milestone. The Sangtam have also been involved in the broader Naga nationalist movement, contributing leaders and activists. The tribe has advocated for development in the remote Kiphire region, which is known for its mineral resources and scenic beauty.', culture: 'Sangtam culture is celebrated through the Mongmong festival, held in September, which marks the harvest and invokes blessings for prosperity. The festival involves elaborate rituals, community feasting, and traditional performances. Sangtam folk dances are communal and energetic, with synchronized group movements. The Sangtam have a rich oral tradition with folktales, legends, and songs that are passed down through generations. Music plays a central role, with log drums, mouth organs, and folk songs. Crafts include weaving, basketry, and woodcarving. The morung system was central to Sangtam education.', food: 'Sangtam cuisine includes dry fish powder, various smoked meat preparations, and foraged vegetables. The Sangtam use dried and fermented foods extensively, preserving fish and meat for long periods. Rice is the staple, grown in jhum fields. Traditional Sangtam meals are simple but nutritious, with emphasis on preserved foods and seasonal vegetables. Rice beer is brewed for festivals and ceremonies.', dress: 'Sangtam traditional dress features distinctive shawls with geometric patterns. The Sangtam use bold color combinations of black, red, and white. Women wear wrap-around skirts with elaborate designs, while men wear kilts and shawls. During Mongmong, people wear their finest traditional attire, adorned with beads, cowrie shells, and brass ornaments. The Sangtam are known for their use of natural dyes in textile production.' },
  { name: 'Pochury', population: '24,000', district: 'Meluri', language: 'Pochury', festival: 'Yemshe', image: TRIBE_IMG[1], description: 'The Pochury are one of the smaller Naga tribes, primarily inhabiting the Meluri area of Phek district. Despite their small numbers, the Pochury have maintained a rich and distinct cultural tradition centered around the Yemshe harvest festival.', history: 'The Pochury trace their origins to migrations from the southeast, settling in the Meluri region. The Pochury developed a close-knit society based on clan affiliations and strong village governance. The Pochury came under British administration relatively late and adopted Christianity in the mid-20th century. The Pochury have been active in Naga political life, advocating for the recognition of Meluri as a separate district. Despite being one of the smallest Naga tribes, the Pochury have maintained a strong cultural identity and have contributed to the diversity of Naga political and social life. The Yemshe festival has become an important marker of Pochury identity and cultural pride.', culture: 'Pochury culture is celebrated through the Yemshe festival, held in October to mark the harvest. The festival is one of the most important Pochury cultural events, involving elaborate rituals, community feasting, and traditional performances. Pochury folk dances are graceful and communal, with synchronized movements and rhythmic chanting. The Pochury have a rich oral tradition with stories of migration, warfare, and daily life. Music is integral, with traditional instruments and folk songs. Crafts include weaving, basketry, and the making of traditional ornaments. The Pochury have worked to preserve their cultural heritage despite their small population.', food: 'Pochury cuisine includes dry meat preparations, pumpkin curry, and various dishes with king chili. The Pochury use smoked and dried meats, preserving them for lean seasons. Foraged vegetables and forest products are important. Rice is the staple, grown in jhum fields. Traditional Pochury meals are simple and communal, shared during village gatherings. Rice beer is brewed for ceremonies.', dress: 'Pochury traditional dress features distinctive shawls with simple but elegant patterns. The Pochury use black, red, and white in their textiles. Women wear wrap-around skirts with geometric designs, while men wear kilts and shawls. During Yemshe, people wear their finest traditional attire, adorned with beads and ornaments. The Pochury textiles are known for their clean lines and subtle patterns.' },
  { name: 'Yimkhiung', population: '82,000', district: 'Shamator', language: 'Yimkhiung', festival: 'Metemneo', image: TRIBE_IMG[2], description: 'The Yimkhiung (formerly Yimchunger) tribe primarily inhabits Shamator and Kiphire districts. Known for their craftsmanship and the Metemneo festival, the Yimkhiung have a rich cultural heritage in eastern Nagaland.', history: 'The Yimkhiung trace their origins to ancestral migrations into the rugged terrain of what is now Shamator and Kiphire districts. The Yimkhiung developed a society organized around clans and village councils, with elaborate social systems. The tribe came under British administration in the early 20th century and adopted Christianity in subsequent decades. The Yimkhiung have been active in Naga political life, and the creation of Shamator as a separate district in 2021 was a significant milestone for the tribe\'s political recognition. The Yimkhiung have contributed to the Naga nationalist movement and have advocated for development in eastern Nagaland. The tribe is also known for its mineral-rich territory, including chromite deposits in the surrounding hills.', culture: 'Yimkhiung culture is celebrated through the Metemneo festival, held in August, which honors the souls of the departed and invokes blessings for the community. The festival involves elaborate rituals, community feasting, and traditional performances. Yimkhiung folk dances are energetic and communal, with synchronized group movements and rhythmic chanting. The Yimkhiung are known for their craftsmanship, particularly in woodcarving, basketry, and weaving. Music is central, with log drums and folk songs accompanying all major events. The morung system played a key role in transmitting cultural knowledge and skills.', food: 'Yimkhiung cuisine includes crab curry, taro preparations, and various smoked meat dishes. The Yimkhiung use river crabs and fish from local streams. Foraged vegetables, including wild yam and ferns, are important. Rice and millet are staples, grown in jhum fields. Traditional Yimkhiung meals emphasize communal eating. Rice beer is brewed for festivals and ceremonies.', dress: 'Yimkhiung traditional dress features distinctive shawls with bold geometric patterns. The Yimkhiung use dramatic color combinations in their textiles. Women wear wrap-around skirts with elaborate designs, while men wear kilts and shawls. During Metemneo, people wear their finest traditional attire, adorned with beads, feathers, and ornaments. The Yimkhiung are known for their elaborate headdresses and use of animal teeth in decoration.' },
  { name: 'Khiamniungan', population: '39,000', district: 'Noklak', language: 'Khiamniungan', festival: 'Khautsausie', image: TRIBE_IMG[3], description: 'The Khiamniungan tribe primarily inhabits Noklak district, the easternmost district of Nagaland. Known for their unique cultural traditions and the Khautsausie festival, the Khiamniungan maintain a distinct identity in this remote region.', history: 'The Khiamniungan trace their origins to ancestral migrations into the Noklak region, one of the most remote parts of Nagaland bordering Myanmar. The Khiamniungan developed a society with elaborate social structures and ritual practices. Due to their remote location, the Khiamniungan maintained traditional practices longer than more accessible tribes. Christianity arrived in the mid-20th century. The creation of Noklak as a separate district in 2021 was a landmark achievement for the Khiamniungan, fulfilling a long-standing demand for administrative recognition. The Khiamniungan have been active in Naga political life and have advocated for development and infrastructure in this remote border region.', culture: 'Khiamniungan culture is celebrated through the Khautsausie festival, a major cultural event involving elaborate rituals, community feasting, and traditional performances. Khiamniungan folk dances are dramatic and communal, with elaborate costumes and synchronized movements. The tribe has a rich oral tradition with myths, legends, and folktales. Music is central, with traditional instruments and folk songs. Crafts include woodcarving, basketry, and weaving. The morung system was central to Khiamniungan education. The tribe\'s proximity to Myanmar has created cultural exchanges with Naga communities across the border.', food: 'Khiamniungan cuisine includes pig liver preparations, sticky rice dishes, and various smoked meat preparations. The Khiamniungan use rice extensively, including a unique sticky rice pudding that is rare among Naga tribes. Foraged vegetables and bushmeat supplement the diet. Rice is the staple, grown in jhum fields. Rice beer is brewed for ceremonies. The Khiamniungan also cultivate a variety of medicinal plants used in traditional cooking.', dress: 'Khiamniungan traditional dress features distinctive shawls with patterns in bold colors. The Khiamniungan use geometric designs with deep symbolic meanings. Women wear wrap-around skirts with elaborate patterns, while men wear kilts and shawls. During Khautsausie, people wear their finest traditional attire, adorned with beads, feathers, and ornaments. The Khiamniungan are known for their elaborate headdresses decorated with hornbill feathers and animal parts.' },
  { name: 'Tikhir', population: '18,000', district: 'Shamator', language: 'Tikhir', festival: 'Tikhir', image: TRIBE_IMG[4], description: 'The Tikhir are one of the smaller and newer recognized Naga tribes, primarily inhabiting the Shamator district. The Tikhir were recognized as a separate tribe in recent years, distinct from the Yimkhiung, and have been working to preserve and promote their unique cultural identity.', history: 'The Tikhir were previously classified as a sub-tribe of the Yimkhiung but were recognized as a distinct Naga tribe in recent years after sustained advocacy. The Tikhir trace their origins to ancestral migrations into the Shamator region. The recognition of the Tikhir as a separate tribe was a significant milestone in Naga political history, reflecting the ongoing process of tribal identity formation. The Tikhir have maintained distinct linguistic and cultural traditions despite their small population. Christianity has been adopted by many Tikhir, though traditional practices are also preserved. The Tikhir continue to advocate for greater recognition and development in their territory.', culture: 'Tikhir culture, while similar in some respects to the Yimkhiung, has distinct elements in language, rituals, and social customs. The Tikhir festival, bearing the tribe\'s name, is the primary cultural celebration, involving community feasting, traditional dances, and ritual performances. Tikhir folk dances are communal and energetic. The tribe has a rich oral tradition with stories and legends unique to their community. Music and traditional instruments play important roles. Crafts include weaving and basketry, with patterns distinct from neighboring tribes. The Tikhir are working to document and preserve their cultural heritage for future generations.', food: 'Tikhir cuisine is similar to other eastern Naga tribes, featuring smoked meats, king chili preparations, and foraged vegetables. Rice is the staple, grown in jhum fields. Traditional Tikhir meals emphasize communal eating during village gatherings. The Tikhir use fermented foods, including soybean and bamboo shoot, in their cooking. Rice beer is brewed for ceremonies.', dress: 'Tikhir traditional dress features shawls and skirts with patterns distinct from neighboring tribes. The Tikhir use specific color combinations and geometric designs that carry cultural meanings. Women wear wrap-around skirts, while men wear kilts and shawls. During the Tikhir festival, people wear their finest traditional attire, adorned with beads and ornaments. The Tikhir are working to revive and promote their traditional weaving techniques.' },
  { name: 'Kuki', population: '31,000', district: 'Peren', language: 'Kuki', festival: 'Mimkut', image: TRIBE_IMG[0], description: 'The Kuki are a Naga tribe distinct from the broader Kuki-Zo communities of Manipur and Mizoram, primarily inhabiting Peren district. Known for the Mimkut festival, the Naga Kuki have a unique cultural identity within the Naga tribal framework.', history: 'The Naga Kuki, distinct from the Kuki communities of Manipur and Mizoram, primarily inhabit the Peren district of Nagaland. They trace their origins to migrations into the Peren region and have developed a distinct identity within the Naga tribal framework. The Naga Kuki came under British administration and adopted Christianity in the early 20th century. They have been recognized as one of the 17 major Naga tribes and participate in the cultural and political life of Nagaland. The Mimkut festival has been an important marker of Naga Kuki identity. The Naga Kuki have contributed to the cultural diversity of Nagaland and have advocated for development in their areas of Peren district.', culture: 'Naga Kuki culture is celebrated through the Mimkut festival, held in January, which marks the harvest and invokes blessings for prosperity. The festival involves community feasting, traditional dances, and cultural performances. Naga Kuki folk dances are graceful and communal, with rhythmic movements. The tribe has a rich oral tradition with folk songs and stories. Music is important, with traditional instruments accompanying community events. Crafts include weaving, with distinctive patterns, and bamboo work. The Naga Kuki maintain close cultural ties with neighboring tribes while preserving their unique traditions.', food: 'Naga Kuki cuisine includes chicken stew, fermented soybean soup, and various preparations with king chili. The Naga Kuki use chicken extensively, along with pork and bushmeat. Foraged vegetables supplement the diet. Rice is the staple, grown in both terraced and jhum fields. Traditional Naga Kuki meals are communal, shared during festivals and gatherings. Rice beer is brewed for ceremonies.', dress: 'Naga Kuki traditional dress features distinctive shawls and skirts with patterns unique to the community. The Naga Kuki use specific color combinations, often featuring red and black. Women wear wrap-around skirts with geometric designs, while men wear kilts and shawls. During Mimkut, people wear their finest traditional attire, adorned with beads and ornaments. The Naga Kuki are known for their use of natural fibers and dyes.' },
];

const CATEGORIES = ['All', 'Ancient', 'British', 'Independence', 'Statehood', 'Modern', 'Tribe'] as const;
const CATEGORY_COLORS: Record<string, string> = {
  Ancient: 'bg-zinc-500',
  British: 'bg-orange-500',
  Independence: 'bg-blue-500',
  Statehood: 'bg-green-500',
  Modern: 'bg-red-500',
  Tribe: 'bg-purple-500',
};
const CATEGORY_BADGE: Record<string, string> = {
  Ancient: 'bg-zinc-700 text-zinc-200',
  British: 'bg-orange-900/60 text-orange-300',
  Independence: 'bg-blue-900/60 text-blue-300',
  Statehood: 'bg-green-900/60 text-green-300',
  Modern: 'bg-red-900/60 text-red-300',
  Tribe: 'bg-purple-900/60 text-purple-300',
};

function sortEvents(events: HistoryEvent[]): HistoryEvent[] {
  return [...events].sort((a, b) => {
    const parseYear = (y: string) => {
      const match = y.match(/(-?\d+)/);
      if (!match) return 9999;
      return parseInt(match[1]);
    };
    return parseYear(a.year) - parseYear(b.year);
  });
}

export function HistorySection() {
  const { userData } = useApp();
  const [events, setEvents] = useState<HistoryEvent[]>(() => sortEvents(HISTORY_DATA));
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null);
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showTribes, setShowTribes] = useState(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [newHistoryCount, setNewHistoryCount] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load custom events and auto-update setting from localStorage
  useEffect(() => {
    try {
      const customRaw = localStorage.getItem('naga-history-custom');
      if (customRaw) {
        const custom: HistoryEvent[] = JSON.parse(customRaw);
        setEvents(sortEvents([...custom, ...HISTORY_DATA]));
      }
      const autoSetting = localStorage.getItem('history-auto-update');
      if (autoSetting !== null) {
        setAutoUpdateEnabled(autoSetting === 'true');
      }
      setLastUpdate(new Date().toLocaleTimeString());
    } catch {
      // ignore
    }
  }, []);

  // Persist auto-update setting
  useEffect(() => {
    try {
      localStorage.setItem('history-auto-update', String(autoUpdateEnabled));
    } catch {
      // ignore
    }
  }, [autoUpdateEnabled]);

  // Auto-update interval
  useEffect(() => {
    if (!autoUpdateEnabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const checkRemote = () => {
      try {
        const remoteRaw = localStorage.getItem('naga-history-remote');
        if (remoteRaw) {
          const remoteEvents: HistoryEvent[] = JSON.parse(remoteRaw);
          if (remoteEvents.length > 0) {
            setEvents((prev) => {
              const existingIds = new Set(prev.map((e) => e.id));
              const newOnes = remoteEvents.filter((e) => !existingIds.has(e.id));
              if (newOnes.length > 0) {
                setNewHistoryCount((c) => c + newOnes.length);
                return sortEvents([...newOnes, ...prev]);
              }
              return prev;
            });
            localStorage.removeItem('naga-history-remote');
          }
        }
      } catch {
        // ignore
      }
      setLastUpdate(new Date().toLocaleTimeString());
    };

    intervalRef.current = setInterval(checkRemote, 60000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoUpdateEnabled]);

  const filtered = useMemo(() => {
    if (!search && filterCategory === 'All') return events;
    const q = search.toLowerCase();
    return events.filter((e) => {
      const matchesSearch = !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.year.toLowerCase().includes(q) ||
        (e.tribe && e.tribe.toLowerCase().includes(q));
      const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, search, filterCategory]);

  const filteredTribes = useMemo(() => {
    if (!search) return TRIBES;
    const q = search.toLowerCase();
    return TRIBES.filter((t) =>
      t.name.toLowerCase().includes(q) ||
      t.district.toLowerCase().includes(q) ||
      t.festival.toLowerCase().includes(q)
    );
  }, [search]);

  function checkForNewHistory() {
    setSpinning(true);
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const mockEvents: HistoryEvent[] = [
        {
          id: `auto-${Date.now()}`,
          year: '2026',
          title: 'Nagaland Education Summit 2026',
          description: 'Nagaland hosted a major education summit bringing together educators from across the northeast.',
          longDescription: 'The Nagaland Education Summit 2026 brought together educators, policymakers, and students from across the northeastern states to discuss innovations in education, digital literacy, and the preservation of indigenous knowledge systems. The summit emphasized the importance of blending modern education with traditional Naga wisdom, and announced new initiatives for rural schools and teacher training programs.',
          image: HIST_IMG[0],
          category: 'Modern',
          author: 'NE360 Auto',
          dateAdded: today,
        },
      ];

      try {
        const customRaw = localStorage.getItem('naga-history-custom');
        const custom: HistoryEvent[] = customRaw ? JSON.parse(customRaw) : [];
        const allNew = [...mockEvents];
        localStorage.setItem('naga-history-custom', JSON.stringify([...custom, ...mockEvents]));
        localStorage.setItem('naga-history-remote', JSON.stringify(allNew));
      } catch {
        // ignore
      }

      setEvents((prev) => {
        const existingIds = new Set(prev.map((e) => e.id));
        const newOnes = mockEvents.filter((e) => !existingIds.has(e.id));
        if (newOnes.length > 0) {
          setNewHistoryCount((c) => c + newOnes.length);
          return sortEvents([...newOnes, ...prev]);
        }
        return prev;
      });
      setLastUpdate(new Date().toLocaleTimeString());
      setSpinning(false);
    }, 1200);
  }

  function handleAddEvent(newEvent: HistoryEvent) {
    setEvents((prev) => sortEvents([newEvent, ...prev]));
    try {
      const customRaw = localStorage.getItem('naga-history-custom');
      const custom: HistoryEvent[] = customRaw ? JSON.parse(customRaw) : [];
      localStorage.setItem('naga-history-custom', JSON.stringify([...custom, newEvent]));
    } catch {
      // ignore
    }
  }

  function handleShare(event: HistoryEvent) {
    if (navigator.share) {
      navigator.share({ title: event.title, text: event.description }).catch(() => {});
    } else {
      try {
        navigator.clipboard.writeText(`${event.title} (${event.year}) - ${event.description}`);
      } catch {
        // ignore
      }
    }
  }

  const relativeTime = useMemo(() => {
    if (!lastUpdate) return '';
    return `Last checked: ${lastUpdate}`;
  }, [lastUpdate]);

  return (
    <div className="px-4 py-4 pb-20">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h2 className="text-xl font-black text-white mb-0.5 flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-red-500" /> Nagaland History
          </h2>
          <p className="text-sm text-zinc-500">From 1000 AD to 2026 · Auto-Updating</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600/40 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events, tribes, years..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
        />
      </div>

      {/* Auto-update controls */}
      <div className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-800 p-3 mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoUpdateEnabled((p) => !p)}
            className={`w-10 h-6 rounded-full flex items-center transition-colors ${autoUpdateEnabled ? 'bg-green-600' : 'bg-zinc-700'}`}
          >
            <span className={`w-5 h-5 rounded-full bg-white transition-transform ${autoUpdateEnabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </button>
          <div>
            <div className="text-xs font-bold text-white">Auto-Update</div>
            <div className="text-[10px] text-zinc-500">{relativeTime}</div>
          </div>
        </div>
        <button
          onClick={checkForNewHistory}
          className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* New history banner */}
      <AnimatePresence>
        {newHistoryCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3"
          >
            <button
              onClick={() => { setNewHistoryCount(0); setFilterCategory('Modern'); }}
              className="w-full flex items-center gap-2 bg-green-600/10 border border-green-600/30 rounded-xl p-3 text-left"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-400">{newHistoryCount} new {newHistoryCount === 1 ? 'history' : 'histories'} added - Tap to view</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
              filterCategory === cat ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* View toggle */}
      <button
        onClick={() => setShowTribes((p) => !p)}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold border transition-colors mb-4 ${
          showTribes ? 'bg-red-600/10 border-red-600/30 text-red-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
        }`}
      >
        <Users className="w-4 h-4" /> {showTribes ? 'Back to Timeline' : 'View 16 Tribes Deep Dive'}
      </button>

      {showTribes ? (
        /* Tribes Grid */
        <div className="grid grid-cols-2 gap-3">
          {filteredTribes.map((tribe, i) => (
            <motion.div
              key={tribe.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedTribe(tribe)}
              className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden cursor-pointer hover:border-red-600/40 transition-colors"
            >
              <div className="h-28 bg-zinc-800 overflow-hidden relative">
                <img
                  src={tribe.image}
                  alt={tribe.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-sm font-black text-white">{tribe.name}</span>
              </div>
              <div className="p-2.5">
                <div className="text-[10px] text-zinc-500 flex items-center gap-1 mb-0.5">
                  <MapPin className="w-2.5 h-2.5" /> {tribe.district}
                </div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" /> {tribe.festival}
                </div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5">
                  <Users className="w-2.5 h-2.5" /> {tribe.population}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Timeline */
        <div className="relative pl-7">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-zinc-700 to-transparent" />
          {filtered.length === 0 && (
            <div className="text-center py-8 text-sm text-zinc-600">No events found. Try different filters.</div>
          )}
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.5) }}
              className="relative mb-4"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[18px] top-4 w-3 h-3 rounded-full ${CATEGORY_COLORS[event.category]} border-2 border-black z-10`} />

              {/* Event card */}
              <div
                onClick={() => setSelectedEvent(event)}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-700 transition-colors"
              >
                {/* Image */}
                <div className="relative h-36 bg-zinc-800 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Category badge */}
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm ${CATEGORY_BADGE[event.category]}`}>
                    {event.category}
                  </span>
                  {/* Year badge */}
                  <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white">
                    {event.year}
                  </span>
                  {/* New badge */}
                  {event.author !== 'NE360' && (
                    <span className="absolute bottom-2 right-2 flex items-center gap-1 text-[9px] font-bold text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> New
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white leading-tight mb-1">{event.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{event.description}</p>
                  {event.tribe && (
                    <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300 border border-purple-600/30">
                      {event.tribe} Tribe
                    </span>
                  )}
                  <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-600">
                    <span>By {event.author}</span>
                    <span>{event.dateAdded}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={() => setSelectedEvent(null)}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-800 w-full max-w-md max-h-[85vh] overflow-y-auto"
            >
              {/* Image */}
              <div className="relative h-60 bg-zinc-800">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <button onClick={() => setSelectedEvent(null)} className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-white">
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm ${CATEGORY_BADGE[selectedEvent.category]}`}>
                    {selectedEvent.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white">
                    {selectedEvent.year}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-black text-white mb-2">{selectedEvent.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-3">{selectedEvent.description}</p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{selectedEvent.longDescription}</p>

                {selectedEvent.tribe && (
                  <button
                    onClick={() => {
                      const tribe = TRIBES.find((t) => t.name === selectedEvent.tribe);
                      if (tribe) {
                        setSelectedEvent(null);
                        setSelectedTribe(tribe);
                        setShowTribes(true);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-600/30 mb-4"
                  >
                    <Users className="w-3 h-3" /> View {selectedEvent.tribe} Tribe Detail
                  </button>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                  <div className="text-[10px] text-zinc-600">
                    By <span className="text-zinc-400 font-semibold">{selectedEvent.author}</span> · {selectedEvent.dateAdded}
                  </div>
                  <button
                    onClick={() => handleShare(selectedEvent)}
                    className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tribe Detail Modal */}
      <AnimatePresence>
        {selectedTribe && (
          <TribeDetailModal tribe={selectedTribe} onClose={() => setSelectedTribe(null)} />
        )}
      </AnimatePresence>

      {/* Add History Modal */}
      <AnimatePresence>
        {showAdd && (
          <AddHistoryModal
            onClose={() => setShowAdd(false)}
            onAdd={(evt) => { handleAddEvent(evt); setShowAdd(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TribeDetailModal({ tribe, onClose }: { tribe: Tribe; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'culture' | 'food'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: BookOpen },
    { id: 'history' as const, label: 'History', icon: HistoryIcon },
    { id: 'culture' as const, label: 'Culture', icon: Music },
    { id: 'food' as const, label: 'Food & Dress', icon: Utensils },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-800 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Hero image */}
        <div className="relative h-64 bg-zinc-800">
          <img src={tribe.image} alt={tribe.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
          <button onClick={onClose} className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          {/* Title */}
          <h3 className="text-2xl font-black text-white mb-1">{tribe.name}</h3>
          <div className="flex items-center gap-3 mb-4 text-xs text-zinc-500">
            <span className="flex items-center gap-0.5"><Users className="w-3 h-3" /> {tribe.population}</span>
            <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {tribe.district}</span>
            <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" /> {tribe.festival}</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-zinc-800 rounded-xl p-1 mb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1 rounded-lg py-2 text-[10px] font-bold transition-colors ${
                    activeTab === tab.id ? 'bg-red-600 text-white' : 'text-zinc-500'
                  }`}
                >
                  <Icon className="w-3 h-3" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <div className="space-y-3">
              <div>
                <div className="text-sm font-bold text-white mb-1">About</div>
                <p className="text-sm text-zinc-300 leading-relaxed">{tribe.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Language</div>
                  <div className="text-sm text-white flex items-center gap-1"><Feather className="w-3 h-3 text-red-500" /> {tribe.language}</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Festival</div>
                  <div className="text-sm text-white flex items-center gap-1"><Calendar className="w-3 h-3 text-red-500" /> {tribe.festival}</div>
                </div>
              </div>
              {/* Image gallery */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="h-28 rounded-lg overflow-hidden bg-zinc-800">
                  <img src={tribe.image} alt={tribe.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div className="h-28 rounded-lg overflow-hidden bg-zinc-800">
                  <img src={TRIBE_IMG[(TRIBES.findIndex(t => t.name === tribe.name) + 1) % TRIBE_IMG.length]} alt={tribe.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <div className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                <HistoryIcon className="w-4 h-4 text-red-500" /> History
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{tribe.history}</p>
            </div>
          )}

          {activeTab === 'culture' && (
            <div>
              <div className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                <Music className="w-4 h-4 text-red-500" /> Culture
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{tribe.culture}</p>
            </div>
          )}

          {activeTab === 'food' && (
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-red-500" /> Food
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{tribe.food}</p>
              </div>
              <div>
                <div className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                  <Shirt className="w-4 h-4 text-red-500" /> Traditional Dress
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{tribe.dress}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function AddHistoryModal({ onClose, onAdd }: { onClose: () => void; onAdd: (e: HistoryEvent) => void }) {
  const { userData } = useApp();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState<HistoryEvent['category']>('Modern');
  const [tribe, setTribe] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState('');

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handlePublish() {
    if (!title.trim() || !year.trim() || !description.trim()) return;
    const newEvent: HistoryEvent = {
      id: `user-${Date.now()}`,
      year: year.trim(),
      title: title.trim(),
      description: description.trim(),
      longDescription: longDescription.trim() || description.trim(),
      image: image || HIST_IMG[Math.floor(Math.random() * HIST_IMG.length)],
      tribe: tribe.trim() || undefined,
      category,
      author: userData.name || 'You',
      dateAdded: new Date().toISOString().split('T')[0],
    };
    onAdd(newEvent);
  }

  const inputCls = 'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors';

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-800 w-full max-w-md max-h-[85vh] overflow-y-auto"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-red-500" /> Add History
            </h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title..." className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Year *</label>
                <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2026" className={inputCls} />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as HistoryEvent['category'])} className={inputCls}>
                  {(['Ancient', 'British', 'Independence', 'Statehood', 'Modern', 'Tribe'] as const).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Tribe (optional)</label>
              <input value={tribe} onChange={(e) => setTribe(e.target.value)} placeholder="e.g. Ao, Konyak..." className={inputCls} />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Short Description *</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="One-line summary..." className={inputCls} />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Long Description</label>
              <textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} placeholder="Detailed story..." rows={4} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Image</label>
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-red-600/40 transition-colors overflow-hidden">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-zinc-600">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px]">Tap to upload image</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="text-[10px] text-zinc-600">Author: <span className="text-zinc-400">{userData.name || 'You'}</span></div>
            <button
              onClick={handlePublish}
              disabled={!title.trim() || !year.trim() || !description.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white transition-colors"
            >
              <Share2 className="w-4 h-4" /> Publish & Auto-Update
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
