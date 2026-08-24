import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Users, Handshake, ChevronLeft, ChevronRight, ChevronUp, Play, Pause, Quote, DoorOpen, Sprout, HandHeart, Flag, Newspaper } from 'lucide-react';
import Navigation from './components/Navigation';
import MiniMap from './components/MiniMap';
import MobileNavControls from './components/MobileNavControls';
import DonateModal from './components/DonateModal';
import EventsModal from './components/EventsModal';
import ContactModal from './components/ContactModal';
import PolicyModal, { PolicyType } from './components/PolicyModal';
import SubscribeModal, { SubscribeStatus } from './components/SubscribeModal';
import NewsModal, { NewsItem } from './components/NewsModal';
import EventDetailModal, { EventDetail } from './components/EventDetailModal';
import Model3D from './components/Model3D';
import { useScrollSpy } from './hooks/useScrollSpy';
import { MAP_SECTIONS } from './constants';

const CAROUSEL_IMAGES = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/Art-Park-Render_rgklby.png",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/plan-1_qyrmng.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/plan-3_nkstly.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/plan-2_rclxza.avif"
];

const HOME_CAROUSEL_IMAGES = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039571/DSC_3127_reooza.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039571/DSC_3629_fv9fws.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039573/DSC_3942_zwsewr.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039570/DSC_3767_rokgki.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039567/IMG_7875_eiqrrs.jpg"
];

const PROOF_CAROUSEL_IMAGES = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039572/DSC_2617_rjcepo.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039569/DSC_1141_c2djki.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039572/DSC_3210_l2d0le.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039569/IMG_7892_htxeos.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039573/DSC_3942_zwsewr.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039568/IMG_7877_eyzllr.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039568/DSC_1379_zilgqe.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1781039567/IMG_7894_wywzo1.jpg"
];

const PARK_ALT_TEXTS = [
  "Rendering of the Manchester Art Park under the bridge, featuring visitors viewing colorful murals on freestanding walls.",
  "Aerial map of the James River and Manchester Bridge, with a yellow circle highlighting the proposed park site underneath.",
  "Architectural site plan showing the layout of proposed zig-zag art walls arranged between the existing bridge support columns.",
  "3D LiDAR terrain scan of the bridge site, with a yellow circle highlighting the specific project location."
];

const PARK_LABELS = [
  "Render",
  "Loc. 1",
  "Plan",
  "Loc. 2"
];

const BUS_IMAGES = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766450517/sticker-bus_difkyk.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1767540148/Sticker_Bus-1_xahlxx.png",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766451468/Installed_q7npit.png"
];

const BUS_ALT_TEXTS = [
  "Front view of the 'Sticker Bus' with its hood completely covered in a sticker mosaic forming a large skull shape.",
  "People applying stickers to the yellow school bus outside Gallery 5, framed by a bright rainbow overhead.",
  "Front of the sticker bus featuring a skull mosaic, parked before a brick building topped with large white milk bottle sculptures."
];

const BUS_LABELS = [
  "SB Supply",
  "SB FF 1",
  "SB FF 2"
];

const PARTNER_LOGOS = [
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/FallLine_zh1gia.avif", alt: "Fall Line logo rendered in white, stylized architectural lettering." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Gallery5_frdtns.avif", alt: "Gallery 5 logo rendered in white sans-serif text." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Manchester_Alliance_kfpqog.avif", alt: "Manchester Alliance logo rendered in white, featuring the organization name and monogram." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Supply_fbkorw.avif", alt: "Supply logo rendered in white, featuring a stylized letter 'S' inside a circular emblem." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Veil_w4myou.avif", alt: "The Veil logo rendered in white, featuring the name inside a circular floral border." }
];

const SPONSOR_LOGOS = [
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/AndDimSum_meazig.avif", alt: "& Dim Sum logo rendered in white, featuring vertically stacked stylized typography." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Atlantic_Union_Bank_logoSQ_wqyvmg.avif", alt: "Atlantic Union Bank logo rendered in white text." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Bombolini_uqkk7h.avif", alt: "Bombolini Pasta logo rendered in white, featuring a vintage western-style font." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/CNTR_oqgdwl.avif", alt: "CNTR logo rendered in white, featuring stylized text below a geometric peak icon." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/communityfoundation_rrd2rx.avif", alt: "Community Foundation logo rendered in white serif text." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/Dawnstar_jhh6fu.avif", alt: "Dawnstar Video Games logo rendered in white, featuring a stylized sunrise icon." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/Envelope_p0tagc.avif", alt: "ENVELOPE logo rendered in white sans-serif text." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766278510/FoyerGallery_nvpbww.avif", alt: "Foyer Gallery logo rendered in white, featuring large lowercase serif lettering." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/ILYSM_ecg3zl.avif", alt: "ILYSM Books logo rendered in white, featuring stylized bubble-letter typography." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/LivelyHarper_b51lnh.avif", alt: "Lively Harper logo rendered in white, featuring the text 'environmental sculpture' and an abstract icon." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/RPAA_hvtuke.avif", alt: "Richmond Performing Arts Alliance logo rendered in white, featuring the acronym RPAA." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/RVA_dzxgvt.avif", alt: "RVA logo rendered in white, featuring large interconnected block letters." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/ShockoeArts_un1kc5.avif", alt: "Shockoe Artspace logo rendered in white sans-serif text." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/Tarrants_cqfagk.avif", alt: "Tarrant's logo rendered in white, featuring a distressed serif font." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/TrialandError_hetr2z.avif", alt: "Trial & Error logo rendered in white, featuring a vintage-style badge design with 'Hand Crafted' and 'Small Batch' text." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/ViragoSpirits_arrtin.avif", alt: "Virago Spirits logo rendered in white, featuring a central monogram." },
  { src: "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Waxmoon_vvidks.avif", alt: "Wax Moon logo rendered in white, featuring the name above a row of moon phases." }
];

const TEAM_MEMBERS = [
  {
    name: "Ian C. Hess",
    role: "President/Director",
    modelSrc: "https://little-giant-society.sirv.com/model.glb",
    blurb: "Ian C. Hess is the business owner of SUPPLY, Richmond's only locally owned Art Supply Store. He is also the President and Director of Little Giant Society and an internationally exhibiting Fine Art painter who has shown work in Rome, Amsterdam, Philadelphia, and at Art Basel in Miami. Ian is a native Richmonder who is wholly dedicated to creating a flourishing arts community in Richmond.",
    alt: "Full-body 3D scan of Ian standing in a high-visibility orange jacket, holding a cup of coffee."
  },
  {
    name: "Kathleen Cortez",
    role: "Vice President/Treasurer",
    modelSrc: "https://little-giant-society.sirv.com/Katie.glb",
    blurb: "If we have eyes to see, our spaces illustrate for us the dialog between beauty, place, and culture. Katie operates her own Architecture practice with a focus on emphasizing the power of design, space, and place. A native of Pennsylvania, Katie studied Architecture at Lehigh University, and moved to Richmond 15 years ago after earning her Master's Degree in Architecture at the University of Virginia.",
    alt: "Full-body 3D scan of Kathleen in a hard hat and patterned cardigan, holding a tall wooden surveyor's rod."
  },
  {
    name: "Ben White",
    role: "Secretary/Marketing Director",
    modelSrc: "https://little-giant-society.sirv.com/Ben.glb",
    blurb: "Benjamin White, a Richmond, Virginia native, works as a commercial photographer, continually looking for new avenues to progress his vision through the lens. Utilizing digital and film mediums, Ben focuses on commercial portrait, product, and event photography.",
    alt: "Full-body 3D scan of Ben in a white button-down shirt, holding a bouquet of red flowers."
  }
];

// Specific Recent News Item
const LATEST_NEWS_ITEM: NewsItem = {
  id: 1,
  title: "(ARTICLE) ABC 8 NEWS - 8ARTS & CULTURE: IAN HESS SPEAKS ON THE FUTURE OF MANCHESTER ART PARK",
  author: "Kendall McAuley",
  date: "Feb 3, 2025 | 6:46 PM EST",
  preview: "In the latest episode of 8News Arts & Culture, Digital Content Producer Kendal McAuley revisited a compelling conversation with Ian Hess, a Richmond-based artist and the owner of SUPPLY art store.",
  content: `RICHMOND, Va. (WRIC) — In the latest episode of 8News Arts & Culture, Digital Content Producer Kendal McAuley revisited a compelling conversation with Ian Hess, a Richmond-based artist and the owner of SUPPLY art store.

Hess first spoke with Kendal this past summer about the proposed Manchester Art Park initiative, an ambitious project aimed at transforming an underutilized space into a dynamic community hub for artists and creatives. Now, months later, we check in to see how the vision is progressing.

Hess, known for his contributions to the local arts scene, has been an advocate for increasing accessible creative spaces in Richmond. The Manchester Art Park, as he describes, is designed to serve as an open-air gallery and a collaborative space for artists to showcase and create work.

Since our initial interview, he has worked with city officials and arts organizations to refine the proposal, incorporating feedback from community members and exploring potential grant opportunities.

With continued efforts and growing community involvement, the Manchester Art Park could soon become a reality, further cementing Richmond’s reputation as a thriving hub for creativity and artistic expression.

To learn more about the initiative, click here. To watch more episodes of 8Arts & Culture and other WRIC NOW livestreams, head to the webpage.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545723/Article10_ruj7qy.avif",
  imageAlt: "Split-screen news interview featuring Kendal McAuley and Ian C. Hess on an ABC 8 Arts & Culture segment.",
  link: "https://www.wric.com/news/8arts-culture-ian-hess-speaks-on-the-future-of-manchester-art-park/"
};

// Second Specific News Item
const ARTICLE_2: NewsItem = {
  id: 2,
  title: "(ARTICLE) RICHMOND ARTIST PROPOSES PUBLIC ART PARK UNDER MANCHESTER BRIDGE",
  author: "Chelsea Jackson",
  date: "Apr 22, 2024 | 12:46 PM EST",
  preview: "Scenery is sparse underneath the Manchester Bridge, but Richmond artist Ian Hess is proposing a pop of color.",
  content: `Scenery is sparse underneath the Manchester Bridge, but Richmond artist Ian Hess is proposing a pop of color.

Hess’s proposal is a public arts park where local artists and patrons alike can come to create, learn, and experience the diverse array of artistic talent Richmond has to offer. The space will also allow artists to flourish, connect with other creatives and build opportunities for artists to make a career in the city.

Richmond was recently ranked second best city in the United States for public art by the USAToday Best List, and yet, there is no public arts park in Richmond.

A graduate of Virginia Commonwealth University’s Arts program, and owner of the local art supply store Supply, Hess, 32, is an active member of the city’s art community and believes that Richmond is an East Coast hub for art and culture but opportunities for artists to flourish can be hard to come by.

“The amount of talent in Richmond is insane,” said Hess. “There’s a desperate lack of structural, institutional support for artists. I am seeing an exodus of talent. People are going to other places and using Richmond in their bio or as a touchstone. I want Richmond to not be a touchstone, but a destination.”

The public arts park would consist of concrete wall structures 24 feet long, 3 feet wide and 9 to 18 feet tall, offering plenty of space for artists of all levels to showcase their work. It would serve as an outdoor rotating gallery of local artists. The initial estimated cost of construction is $455,000. In comparison, Hess’ presentation to the city includes the cost of painting Richmond’s bus lane red which was $2 million not including construction.

His proposal also includes the work needed to make the park come to life, including site clearing, potential site surveys requested by the city, building permits, inspections, landscaping and architectural design.

Hess also lists the benefits of using the empty space underneath the Manchester Bridge, south of the river. The unused spot is fully accessible for construction equipment, there is an existing bike path, walkway, and rock climbing wall leading to the site, and an existing trash system already in place for the area.

Hess sees potential for the site to become a thriving district away from local businesses.

Citing the success of the RVA Street Art Festival as proof of the city’s yearning for more art spaces, Hess wants the park to be a space for new artists to emerge and careers to be made. Richmond has hosted the RVA Street Art Festival at the Haxall Canal Hydro Plant in 2012, the GRTC Bus Depot in 2013, the Manchester Silos in 2016, and The Diamond 2017, then returned to the Hydro Plant again in 2022. The festival allows artists to practice and experiment with new mediums and attracts thousands of visitors each year.

Mickael Broth, a Richmond artist known as the Night Owl, helped to organize the RVA Street Art Festival. Broth moved to Richmond in 2001 because of the city’s strong graffiti scene.

“I think Ian has definitely identified a major hole in the city’s landscape as far as having the space for people to learn this skill because like anything else, it takes practice to learn. You can’t just paint on a canvas and scale up,” Broth said. “He’s identified a void that needs a solution and it’s not a far fetched crazy idea. There are many places where people can just paint on a wall.”

Examples of existing public arts parks include IX Art Park in Charlottesville and Logit Phase 1 in San Antonio and many more around the United States. Hess says the parks are some of the cleanest areas in the city. They take care of themselves because people want to be there and foster community as much as possible. The public arts park also serves as a way to cut down on graffiti and vandalism.

The city of Richmond said that it is considering the project.

“The city values its collaboration with the local art community, as public art has been and remains an economic force in both Richmond and the surrounding area. However, while we appreciate every artist’s proposal, we must consider several factors before approving an art installation. Although we support the artist’s concept, we must continue to work together to find a suitable location that satisfies all parties involved,” a city spokesperson said via email.

“The recommendation of the city is to pilot a project like this on a smaller scale in a highly visible location to provide proof-of-concept,” the spokesperson added.

“With the city, it carries this massive ‘but,’” Hess said. “So far it’s been very minor things that are essentially a reason to not do the whole thing at that location.”

He said he’s also shopped his idea to the Department of Public Utilities and the Public Arts Commission.

For Hess, the lack of support is frustrating but it isn’t new in the arts community. Richmond mixed media artist, Todd Hale, earned a bachelor’s degree in painting and printmaking from Virginia Commonwealth University in 1996.

After graduation, Hale moved into an apartment above what was formerly Artspace, a gallery instrumental in starting the First Friday Art Walk in Richmond. Hale chose the location specifically because of its connection to Richmond’s growing art scene.

“I feel honored to even call myself an artist in a city of artists. It’s really a privilege and an honor and I take it pretty seriously that Richmond has this art tradition,” said Hale. “I have lots of great shoulders to stand on of artists that came before me and some who are still around.”

Hale owns Antennae gallery located at 8 E. Broad St, in what is considered the city’s Arts District. Hess’s art store Supply, is located at 305 W. Broad St. also in the Arts District. The city officially designated it the Arts District in 2012. The notion was appreciated but tenants of the area didn’t see any motion forward.

“I think the people in the city are supportive. Richmond itself is a city of art fans,” said Hale.

Hess believes a public arts park will allow Richmond to develop into a thriving city for the arts and raise up generations of makers to come. He predicts the public arts park will secure Richmond’s status as a top-tier city for the arts, garnering the attention of world-renowned artists to both collaborate on the effort and contribute to the development of the culture.

“It doesn’t have to be here [in the Arts District] but it needs to be somewhere. It’s creating touchstones where Richmond can foster its already vibrant art community and it doesn’t need a miracle,” Hess said.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545720/Article9_hu5xpy.avif",
  imageAlt: "Portrait of Ian C. Hess smiling while leaning on a wooden ladder in front of a wall of colorful spray paint cans.",
  link: "https://richmond.com/life-entertainment/local/art-theater/article_a5ac41ee-f7f4-11ee-8537-3363f8daa91f.html"
};

// Third Specific News Item
const ARTICLE_3: NewsItem = {
  id: 3,
  title: "(ARTICLE) FUNDRAISER HOPES TO BUILD MOMENTUM FOR PROPOSED RICHMOND ARTS PARK",
  author: "Chelsea Jackson",
  date: "May 19, 2025 | 1:37PM EST",
  preview: "It’s been over two years since Richmond artist Ian Hess began laying down plans for the city’s first public arts park.",
  content: `It’s been over two years since Richmond artist Ian Hess began laying down plans for the city’s first public arts park.

“When I first started this, I thought it would be about a year’s worth of work to get approval,” Hess said. “Here we are 2 1/2 years later.”

On Sunday, Little Giant Society, an art-focused nonprofit headed by Hess, held its first fundraiser for the arts park at The Veil Brewing Co. in Scott’s Addition. The event featured four live artists, three DJ’s and a miniature of the park created in collaboration with sculpture artist Matt Lively.

“The reason we’re here today is one to let more people know, but also just to give a sense of how much this is desired for the city,” Hess said.

“A park like this, it needs to be through the city. I think the city saying yes, we want this park here is saying that we want our arts community to flourish. I think it’ll be transformative for the Richmond art scene.”

A small team of three, Little Giant Society includes Hess, architect Katie Cortez and marketing director Ben White.

“The three of us started a nonprofit to help deal with maintenance issues and things like that after the park gets implemented,” Cortez said.

“I think Richmond needs it,” she continued, speaking on why she believes in the project. “I think Richmond thinks it’s a bigger art city than it actually is, and I think that the city is stuck in a lot of old ways. They need to understand that people want this to happen.”

The park, proposed for underneath the Manchester bridge, would serve as an outdoor rotating gallery of local artists.

Examples of existing public arts parks include IX Art Park in Charlottesville and Logit Phase 1 in San Antonio and many more around the United States.

Last year, Richmond was ranked second-best city in the United States for public art by the USAToday Best List. But many Richmond muralists say that there aren’t many opportunities to practice mural painting in the city.

“For anyone who isn’t already really far into the game where they’re getting paid to do professional murals on businesses or buildings, to get into doing it is all on an individual. And a lot of times there isn’t like means to actually be able to learn how to make this happen,” Richmond artist Eli McMullen said.

McMullen was one of the four artists to paint outside of The Veil on Sunday.

“I think having a space where it isn’t just a one-weekend festival or a one-time event, it could just be an ongoing series of not only allowing people to express themselves, but to connect. Having a space where you could go and find this kind of energy and meet people that are like-minded and creative, that would be extremely beneficial for allowing people to feel like they belong somewhere and that they don’t have to worry about prosecution to put paint on the wall,” McMullen added.

Folks were also able to give feedback on the design and concept and suggest a name for the park at Sunday’s event.

Artist Noah Birkeland suggested a few names. His favorite was Troll Town.

“Because it’s under a bridge,” he said. “I feel like the art park is a necessity for the artists of Richmond. It’s very easy for the cool parts of Richmond to kind of get pushed under the rug in favor of big business mostly. These sorts of community-run open spaces are really important, and I think we need more of them in Richmond, and especially for the art scene something like that is really important.”

Hess says that the idea has support from the Richmond Police Department and members of the City Council, including Ellen Robertson, who presides over the 6th District, where the park would be located.

He says the last and biggest yes needed is from the Department of Public Works.

“For Richmond, it makes no sense that this isn’t here already. I think it should have been here in 1970,” Hess said.

“We could have a huge impact with very small cost and maximum outreach, and also bridge the divide between the creative community and the city government in a very significant and tangible way. So that, to me, is worth chasing it down.”`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545720/Article8_qioq1x.avif",
  imageAlt: "Wooden architectural scale model of the art park, displaying the bridge structure and miniature graffiti walls.",
  link: "https://richmond.com/news/local/article_b05a43c8-a799-4385-910e-23d47f1052c1.html"
};

// Fourth Specific News Item
const ARTICLE_4: NewsItem = {
  id: 4,
  title: "(ARTICLE) RICHMOND TIMES DISPATCH - STICKER EXHIBIT SHOWCASES OVER 200 ARTISTS",
  author: "Chelsea Jackson",
  date: "Sep 22, 2025 | 4:29 PM EST",
  preview: "Art comes in various mediums — painting, sculpting, digital, and even stickers.",
  content: `Art comes in various mediums — painting, sculpting, digital, and even stickers.

“Hello My Name Is“ is an international sticker exhibition featuring more than 200 artists from around the world. Using United States Postal Service labels as their canvas, artists transformed everyday shipping materials into traveling artwork. All of the artists were introduced with the phrase: “Hello my name is.”

Masterminded by Richmond artist Ian Hess, the exhibit references the USPS 228 standard Priority Mail shipping labels — one of the most popular stickers used in street art.

“They’re just paper and free with the USPS, that’s the reason that they’re so beloved,” he said.

Hess made the sticker his own, printing United States Supply Service on the label referencing his art supply store at 320 W. Broad St., Supply.

He sent the stickers off to the artists who signed up to participate, and what came back were more than 200 miniature works of art — now displayed at Gallery5 through Friday.

The exhibit features big-name sticker artists such as RxSkulls, MCA Evildesign and a special piece done by Shepard Fairey, founder of OBEY Clothing and creator of the André the Giant Has a Posse sticker campaign done in 1989, plus his 2008 HOPE poster of Barack Obama during his presidential campaign.

There’s also a few hard-to-find USPS designs.

“These are from 1996 in May,” Hess said, pointing to a frame. “There’s become an obsessive collection nature to old-school USPS things because when they’re done with the design, they don’t use it again.”

There’s a sticker from Richmond artist Noah Scalin, who also provided a custom piece for the exhibit’s other component: the sticker bus.

Inspired by a 2024 exhibition in Estonia, the sticker bus — a yellow school bus bought by Hess and his art-based nonprofit Little Giants Society at an auction — will be Richmond’s first-of-its-kind, full-sized vehicle covered in thousands of stickers from artists in the exhibition and community donations.

The rolling installation will double as both artwork and a community-powered project.

It also features a skull made of stickers by Scalin on the hood.

“The hope is that it becomes one of those iconic Richmond things,” Hess said. “I want to drive it all over the place.”

Hess said he’s been thinking about ways to use the bus, such as activating it into a mini-mobile shop on First Fridays, and hopefully field trips to the Manchester Art Park — an outdoor gallery under the Manchester Bridge proposed by Hess last year.

Folks were also able to add stickers to the bus outside of the Byrd Theatre earlier this month for the premiere of the “Sticker Movie,” which dives into the history and culture of sticker making.

There will be another chance to add stickers to the bus Friday during the exhibit’s closing reception and free jazz night at Gallery5.

Stickers featured in “Hello My Name Is” are available for sale at littlegiantsociety.org/donate. Smaller pieces are $120 and large pieces are $500. Some of the proceeds will go toward raising funds for the art park, which is still awaiting approval from the city.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545723/Article7_snxzot.avif",
  imageAlt: "Front view of the 'Sticker Bus' with its hood completely covered in a sticker mosaic forming a large skull shape.",
  link: "https://richmond.com/news/local/article_6b168d4b-68a5-49a1-ac12-6b4bdb2b5eb0.html"
};

// Fifth Specific News Item
const ARTICLE_5: NewsItem = {
  id: 5,
  title: "(ARTICLE) CBS 6 - RICHMOND ARTIST''S 'HELLO MY NAME IS' PROJECT SPOTLIGHTS STICKER CULTURE",
  author: "Andrew Cothern",
  date: "Sep 03, 2025 | 7:53 AM EST",
  preview: "RICHMOND, Va. — Richmond artist Ian Hess is kicking off a month-long, multi-layered art project that puts sticker culture in the spotlight.",
  content: `RICHMOND, Va. — Richmond artist Ian Hess is kicking off a month-long, multi-layered art project that puts sticker culture in the spotlight.

The series “Hello My Name Is,” which kicks off at Gallery5 during the First Friday art walk, is an exhibition highlighting sticker culture as an art form featuring more than 270 artists from around the world.

Hess, known for his work with Little Giant Society, Supply RVA, and the development of the Manchester Art Park (for which he was named one of Style Weekly’s people to watch in the arts in last year’s Fall Arts Preview), saw the similarities of name tags at office parties and networking events to the artistic ways of sticker making. Click here to keep reading on Style Weekly.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545722/Article6_asem0y.avif",
  imageAlt: "Portrait of Ian smiling next to the open door of the yellow school bus, backed by a large colorful mural.",
  link: "https://www.wtvr.com/news/local-news/hello-my-name-is-sticker-art-sept-3-2025"
};

// Sixth Specific News Item
const ARTICLE_6: NewsItem = {
  id: 6,
  title: "(ARTICLE) ABC 8 NEWS - RICHMOND ARTIST LAUNCHES STICKER-THEMED EXHIBITION, PUBLIC ART PROJECT",
  author: "Sahara Sriraman",
  date: "Aug 21, 2025 | 8:57 AM EST",
  preview: "RICHMOND, Va. (WRIC) — Richmond artist and curator Ian Hess is kicking off a month-long, multi-layered art project that puts sticker culture in the spotlight.",
  content: `RICHMOND, Va. (WRIC) — Richmond artist and curator Ian Hess is kicking off a month-long, multi-layered art project that puts sticker culture in the spotlight.

The series launches Sept. 5 at Gallery5 during the city’s First Friday art walk with “Hello My Name Is,” an exhibition featuring hundreds of artists from around the world. The show highlights sticker culture as an art form that has grown from city streets to international recognition.

The celebration continues Sept. 13 at the Byrd Theatre with a screening of “Sticker Movie,” a documentary, exploring the history of sticker making, the community of collectors, and the subculture of slap taggers.

The project will culminate with a first-of-its-kind mobile art piece in the United States — a sticker-covered bus. Thousands of stickers submitted by participating artists will be used to wrap an entire bus, turning it into a rolling public artwork. The concept was inspired by a similar project in Estonia in 2024, but this will be the first time the idea is brought to American streets.

The exhibition and activations are the latest projects from Hess, known for his work with Little Giant Society, Supply RVA and the development of the Manchester Art Park.

With “Hello My Name Is,” Hess said the goal is to highlight repetition, distinctness, collectability and longevity — all central to sticker culture — while creating opportunities for the Richmond community to engage with a global movement.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545721/Article5_rambse.avif",
  imageAlt: "Multilingual 'Hello My Name Is' sticker design featuring Spanish, Arabic, Hindi, and fantasy scripts on colorful bands.",
  link: "https://www.wric.com/news/local-news/richmond/richmond-artist-launches-sticker-themed-exhibition-public-art-project/"
};

// Seventh Specific News Item
const ARTICLE_7: NewsItem = {
  id: 7,
  title: "(ARTICLE) RICHMOND MAGAZINE - STICK-TO-ITIVENESS",
  author: "Harry Kollatz Jr.",
  date: "Sep 4, 2025 | 9:13 AM EST",
  preview: "Ian Hess (the owner of Supply arts and crafts store), arts organization Little Giant Society and host Gallery5 aren’t adhering to convention for “Hello, My Name Is ...,” an international exhibition of stickers.",
  content: `Ian Hess (the owner of Supply arts and crafts store), arts organization Little Giant Society and host Gallery5 aren’t adhering to convention for “Hello, My Name Is ...,” an international exhibition of stickers. The showcase premieres 5 to 11 p.m. Sept. 5 at the nonprofit cultural space in Jackson Ward. Besides the work of more than 270 artists from around the world, there’s a bus, a book and a movie all about these little depictions that occupy a niche somewhere between graffiti and street art.

Stickers are perhaps best known for decorating car bumpers, but there is much more to the adhesive art. “The game is repetition, distinctness, collectability and longevity,” explains Hess, who is also advocating for a public art park beneath the Manchester Bridge. “Stickers can be found on the back of stop signs, dive bar bathrooms, museum panels and Romanian buses. They have become a staple of the modern-day cityscape. They declare proudly, and at times secretly, that the artist was here.”

For the Gallery5 exhibition, Hess solicited contributions from makers located across the globe. Some he personally knew, and others came by way of friends of friends, Instagram and an open call. He needed plenty of stickers, because he purchased a decommissioned school bus to cover it with 18,000 of them as a “moving, sculptural, public art piece.” The public is also invited to bring their own adhesive art to contribute to the bus during Gallery5’s First Fridays event on Sept. 5. The project was inspired by a sticker-laden bus in Romania. Hess says, “I would’ve been hard pressed to believe such a project is possible without the people at Stencibility [who created the bus].”

A companion to the exhibition, the forthcoming “Hello My Name Is: The Book” is a collaboration between Hess and his friend Becc Keyes, whose previous work, “The Last Couple Yrs.,” presents an array of the Richmond area’s abandoned spaces and graffiti from the past decade. The book will feature stickers from the exhibition as well as designs and statements from artists around the world. It will cost approximately $60, and proceeds will defray exhibit expenses and fund the proposed public art park. Available now for preorder, the book will be published after the exhibition concludes. Anyone who donates $100 to the public art park campaign at littlegiantsociety.org will automatically receive a copy.

As a companion event, the 2023 documentary “The Sticker Movie” will be screened at The Byrd Theatre on Sept. 13. The film delves into the sticker-making subculture, discusses the history of the adhesive art and includes interviews with a couple dozen artists and enthusiasts. A community of creatives and filmmakers from across the country made the documentary, including Will Deloney, Stacey Governale-Bloom, Ricky de Laveaga, Tori Luecking, Alicia Parrott, Sha-Risse R. Smith and Jim Tozzi. “They’ve agreed to show this in Richmond in tandem with the [exhibition], and we’re honored to host them here in our city,” Hess says with excitement.

Which all goes to show that no matter how small or large an art form may be, there is no royal road to accomplishment. Bringing the work to completion requires sheer stick-to-itiveness.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545720/Article4_scjsbb.avif",
  imageAlt: "Stacks of die-cut stickers on a yellow surface, featuring designs of a blue toad, skeleton turtle, and alien.",
  link: "https://richmondmagazine.com/arts-entertainment/galleries/hello-my-name-is-gallery5/"
};

// Eighth Specific News Item
const ARTICLE_8: NewsItem = {
  id: 8,
  title: "(ARTICLE) STYLE WEEKLY - STUCK ON YOU",
  author: "Andrew Cothern",
  date: "Sep 22, 2025 | 10:58 AM EST",
  preview: "“Hello My Name Is” highlights sticker culture with works from hundreds of artists around the world.",
  content: `“Hello My Name Is” highlights sticker culture with works from hundreds of artists around the world.

Richmond artist Ian Hess is kicking off a month-long, multi-layered art project that puts sticker culture in the spotlight.

The series “Hello My Name Is,” which kicks off at Gallery5 during the First Friday art walk, is an exhibition highlighting sticker culture as an art form featuring more than 270 artists from around the world.

Hess, known for his work with Little Giant Society, Supply RVA, and the development of the Manchester Art Park (for which he was named one of Style Weekly’s people to watch in the arts in last year’s Fall Arts Preview), saw the similarities of name tags at office parties and networking events to the artistic ways of sticker making.

“It’s still an introduction to someone,” he says. “Sticker making is the same way. You get introduced to the artists through their work.”

Each piece of artwork is a custom-made vinyl sticker that uses a “Label 228” base sticker as the canvas. “Label 228” is a sticker issued by the United States Postal Service for labeling packages that is free of charge and can be acquired in large quantities. Due to its widespread availability, the large areas of blank space in the design, and its ability to handle different artistic mediums, the label has become widely used by sticker artists.

“It’s become kind of similar to the ‘Hello, my name is’ sticker,” Hess says. “It’s free and accessible. Anyone who can get their hands on it. It’s paper, so you can do just about anything on it. It’s kind of become this staple of the sticker making world.”

With the exhibition, Hess wants to highlight repetition, distinctness, collectability, and longevity, which are prevalent in sticker culture. He also wants to create opportunities for the Richmond community to engage with a global movement.

“[The sticker world] is such an insanely rambunctious, generous, weird and hyper-connected art world,” Hess says. “Each one of the people in it is just so willing to give and share, and every sticker artist I know has a hundred designs, if not thousands. It’s just wild.”

The exhibition will serve as the cornerstone for additional activities throughout the month, including a screening of the documentary “Sticker Movie” at the Byrd Theatre. The 2023 film delves into the history and culture of sticker making, slap taggers, and the diverse community of collectors.

The project will also include a unique mobile art piece with a sticker-covered bus. Thousands of stickers submitted by participating artists, volunteers, and donations will be used to cover an entire bus, turning it into a rolling public artwork. The concept was inspired by a similar project in Estonia called Stencibility in 2024, but this will be the first time the idea is brought to American streets.

“They got thousands of stickers to cover a transit bus and I thought that was such a Richmondesque thing and would do great here,” Hess says.

After unsuccessful attempts to get a city bus plastered with stickers, Hess discovered a government surplus website with recently decommissioned school buses up for auction and quickly jumped on the opportunity.

“My friend and I went to see the buses a day before the auction and we found the perfect one we wanted almost immediately,” he says. “It had new tires, a Mercedes-Benz engine, new batteries, fresh oil, a full tank of diesel, a wheelchair ramp, and only some minor electrical problems. We knew that was our Sticker Bus.”

And despite a heart-racing bidding war with another interested buyer at the auction, Hess managed to win the auction at what he says was “an insanely low price for a full-size school bus.”

Hess put the callout to artists and volunteers around the world to submit sticker art that would cover the bus from head to tail pipe before coating the entire thing in an automotive finish to preserve the artwork. The Sticker Bus will be on display at the exhibition opening and used in the future for artist field trips to the Manchester Art Park, gallery rides, trips to the VMFA, and more.

“There are so many ideas coming out of the woodwork for ways we can use this bus,” Hess says. “We could do paint workshops or go out in the community for projects showing off the artwork. It’s so flexible with what we can do because it’s such a minimalist construction.”

Hess hopes that this exhibition will expose people to stickers as an emergent art form, which he says has become a staple of the modern day cityscape.

“Any city you go to, you’ll see stickers on the back of a stop sign, a bar bathroom, on an electrical box, or a doorway,” he says. “You get exposed to that artist and learn who they are. That kind of encapsulates the theme of ‘Hello My Name Is’ so it all just seems very connected.”

“Hello My Name Is” kicks off Sept. 5 from 5-11 p.m. at Gallery5 featuring music performances by Solace Sovay, Ducttape Jesus, Snack Truck, and Dropheads. The screening of “Sticker Movie” takes place Sept. 13 at the Byrd Theatre. More information can be found at littlegiantsociety.org.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545720/Article3_cmgo9d.avif",
  imageAlt: "Yellow school bus superimposed over a colorful background pattern reading 'HELLO MY NAME IS'.",
  link: "https://www.styleweekly.com/stuck-on-you/"
};

// Ninth Specific News Item
const ARTICLE_9: NewsItem = {
  id: 9,
  title: "(Letter to The Editor) Democracy on a Budget",
  author: "RVA Staff",
  date: "May 13, 2025 | 12:15 PM EST",
  preview: "In a political climate defined by massive budget cuts, slush funds, fraud, and the gutting of national arts funding — even for already approved grants — I try to set that chaos aside.",
  content: `In a political climate defined by massive budget cuts, slush funds, fraud, and the gutting of national arts funding — even for already approved grants — I try to set that chaos aside. I focus on what I can actually affect, what I can reasonably change. 

For me, that’s Richmond — the city I love most. It’s where I’ve put down roots: my friends, my community, my four years at VCU in Painting + Printmaking, my art store SUPPLY, a decade-long career as a painter, and my nonprofit, Little Giant Society — created to build Richmond’s first Public Art Park. I’ve been working on that project for over two and a half years now, essentially acting as a de facto lobbyist. 

Richmond has branded itself as an arts city for years — and a public Art Park is exactly the kind of project that puts money where the messaging is. As I ask the city for state and local support, I keep coming back to the same questions: What is our money actually being spent on? How is it being spent? And why does it cost $10,000 to change a light bulb on Broad Street? (Yes, that’s real.) 

These things are tangible and quantifiable. They affect everyone in Richmond, every day. How does it feel to walk on our sidewalks? Why is there a 16-building dead zone on one of the city’s main roads? Why weren’t the water filtration systems fixed for years, even after they were flagged as needing repair? There’s a general sense of fiscal corruption — not just palpable, but almost casually accepted as destiny. And for good reason.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545719/Article2_j15evd.avif",
  imageAlt: "Graphic of a lightbulb containing a ballot box with a dollar sign, surrounded by lightning bolts and currency symbols.",
  link: "https://rvamag.com/opinion-editorial/letters-to-the-editor/letter-to-the-editor-democracy-on-a-budget.html"
};

// Tenth Specific News Item
const ARTICLE_10: NewsItem = {
  id: 10,
  title: "(Interview) RVA MAG. Ian C. Hess on Painting Myths, Selling Dreams, and Surviving Richmond",
  author: "R. Anthony Harris",
  date: "Jan 3, 2025 | 3:56 PM EST",
  preview: "Back in January, our President and Director, Ian C. Hess sat down for an interview with RVA Mag to discuss his work, his career as an artist, and to dive into the details and goals he has for Little Giant Society and Richmonds first Public Art Park!",
  content: `Back in January, our President and Director, Ian C. Hess sat down for an interview with RVA Mag to discuss his work, his career as an artist, and to dive into the details and goals he has for Little Giant Society and Richmonds first Public Art Park!`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545723/Article1_uleejt.avif",
  imageAlt: "Split image: Black and white profile of Ian C. Hess alongside a painting of a blue, starry-hooded classical bust.",
  link: "https://rvamag.com/art/ian-hess-on-painting-myths-selling-dreams-and-surviving-richmond.html"
};

const ARTICLE_11: NewsItem = {
  id: 11,
  title: "(ARTICLE) NON-PROFIT PROPOSES VISION FOR RICHMOND’S FIRST PUBLIC ART PARK",
  author: "Lindsey West",
  date: "May 25, 2026 | 06:53 PM EST",
  preview: "RICHMOND, Va. (WRIC) — Hiding below the hustle and bustle of the Manchester Bridge, an explosion of creativity, eye to eye with the serenity of the James River — Richmond’s proposed public art park is waiting to be discovered.",
  content: `RICHMOND, Va. (WRIC) — Hiding below the hustle and bustle of the Manchester Bridge, an explosion of creativity, eye to eye with the serenity of the James River — Richmond’s proposed public art park is waiting to be discovered.

Richmond non-profit Little Giant Society is behind the project three years in the making.

Inspiration came to Ian C. Hess, Little Giant Society’s president, when he visited a public art park beneath a bridge in Amsterdam. Hess, an artist himself, said he “could not believe that it wasn’t in Richmond.”

When Hess returned home, he came to Katie Cortez, vice president of Little Giant Society, and they agreed to “figure it out.”

“Who do we even reach out to? Where do you start? Who do you talk to, to do something like this?” Hess said.

The style of the art park is called Hall of Fame, meaning best piece stays the longest.

“Obviously that’s up for interpretation but if someone does a really wild, goes in all day and it stays up for like a month or two months, that’s a high honor,” Hess said.

The culture of the public art park is an understanding that your work could be painted over, and you are welcome to paint over other artists’ work.

As a way to prove to Richmond City Council that the project was viable, and to bring the community together, Little Giant Society hosted a ‘Proof in the Park’ event. It was an open call for artists to paint on nine walls beneath the Manchester Bridge.

Hess said the forecasted rain held off for hundreds of people to flock to the proposed location on April 25.

Some notable artists that came to paint at “Proof in the Park” include Emily Herr, Eli McMullen, Jon Murrill, Nils Westergard, Earl Mack and more.

Richmond Mayor Danny Avula also attended the event, even asking for a skinny cap when encouraged to throw his own tag on the walls.

“I don’t think it can be overstated the significance of the mayor coming underneath the bridge and giving a speech and grabbing a spray paint can and being willing to get up there,” Hess said.

Cortez said the space is not just for artists, but “also for people who might not necessarily intersect with something like this to sort of immerse them into something they wouldn’t normally do.”

For artists, Richmond may feel like a steppingstone city, according to Cortez. However, a project like the public art park could expand the River City’s influence.

“There’s this glass ceiling that you just feel like you can’t get beyond,” Cortez said, “We feel like something like this might just help take Richmond into the next tier, where this is actually some place people want to come and stay.”

Next steps, Hess said Little Giant Society has been given permission to submit the full scope of their plan to the city.

“The ways in which it’s going to grow and foster and be generative is like, it’s out of our hands,” Hess said, “You just give people this huge canvas and Richmond is so made of color and creative that they’re just going to take off with it.”`,
  image: "https://www.wric.com/wp-content/uploads/sites/74/2026/05/IMG_7875.jpeg?resize=768,1015",
  imageAlt: "Photo from Proof in the Park event",
  link: "https://www.wric.com/news/local-news/richmond/non-profit-proposes-vision-for-richmonds-first-public-art-park/"
};

const ARTICLE_12: NewsItem = {
  id: 12,
  title: "(ARTICLE) RICHMOND ART PARK PROPOSED UNDER MANCHESTER BRIDGE",
  author: "Amaya Mitchell",
  date: "May 22, 2026 | 1:08 PM EST",
  preview: "RICHMOND, Va. (WWBT) - A group of Richmond artists is working to create a permanent art park under the Manchester Bridge near the floodwall.",
  content: `RICHMOND, Va. (WWBT) - A group of Richmond artists is working to create a permanent art park under the Manchester Bridge near the floodwall.

Artist Ian Hess recently hosted “Proof in the Park,” a temporary installation to demonstrate the concept to city officials. The walls filled with artwork were up for a few days.

“It’s been like nothing else I’ve ever done in my life. It was crazy. There were hundreds of people here,” said Hess, an artist and president of the Little Giant Society.

Hess said the setup and location are similar to what the actual design would be.

“So reminiscent of like under the bridge, I came to the spot all the time. Anyways, I would always bike around. It’s like my favorite view in the city. And it was just like this makes the most sense here,” Hess said.

The idea came after Hess visited a public art park in Amsterdam. When he returned to Richmond, he took the concept to architect Katie Cortez.

“So after Ian got back from Amsterdam and sort of had this amazing experience over there, he came to me and was like, I think we need to do this in Richmond. How do we get there?” said Cortez, vice president of Little Giant Society.

“I think something like this is pivotal for Richmond, because I think Richmond needs to understand the value and the importance of the arts,” Cortez said.

The group is talking with the city before getting approval on a formal park plan.

“So when we submit the park plan, it’s going to be back and forth. There’s going to be discussions. There’s going to be negotiations. But ultimately, what we’re trying to do is put in place concrete walls in the space that are of the same design as the proof in the park temporary walls,” Hess said.

Mayor Danny Avula stopped by the “Proof in the Park” event. In a statement, his spokesperson wrote, “The Mayor went to the Arts Park event on April 25th, and loved it. He was blown away by the energy and creativity. There are always various planning efforts for anything like this to become official but Mayor Avula is extremely excited to see more public art become a reality in Richmond.”

Hess said they will continue working on the plans and hope to get the art park up “very soon.”`,
  image: "https://gray-wwbt-prod.gtv-cdn.com/resizer/v2/B4RX2QHS45DINKKYBMVBHUBK5E.jpeg?auth=95296f841a6fb7b906127556205d55d01c122edb1f5d18b219908831e5568ade&width=1300&height=1732&smart=true",
  imageAlt: "Richmond art park proposed under Manchester Bridge",
  link: "https://www.12onyourside.com/2026/05/22/richmond-art-park-proposed-under-manchester-bridge/"
};

const ARTICLE_13: NewsItem = {
  id: 13,
  title: "(ARTICLE) RICHMOND APPROVED A PUBLIC ART PARK PILOT. NOW IT'S STUCK",
  author: "Sabrina Moreno",
  date: "May 8, 2026",
  preview: "Richmond officials won't say whether a temporary public art experiment under the Manchester Bridge has a future — but organizers say the city wants it taken down.",
  content: `Richmond officials won't say whether a temporary public art experiment under the Manchester Bridge has a future — but organizers say the city wants it taken down.

Why it matters: Richmond asked artists to test whether a dedicated public art park could work. And while organizers say they delivered, the city hasn't decided what comes next.

State of play: This past fall, city officials recommended the Little Giant Society — the group behind the proposed park — test the concept on a smaller scale first.

They did on April 25, transforming the unused stretch beneath the bridge into an open-air art space with 500-pound rotating murals, thanks to a special permit from Parks & Recreation and about $16,000 in fundraising.
The event even got Mayor Avula out to paint, Ian Hess, the nonprofit's president, tells Axios.
And according to Hess, who says Avula put his signature on one of the murals, the mayor personally told him he'd call members within his administration to discuss making the project permanent.
The mayor's office didn't confirm or deny Hess' account.

"If we want to build a project like this, in this specific location, it will require aligning a lot of different pieces and stakeholders," Avula said in a statement to Axios.
"It's definitely worth exploring — if not this location, [then] somewhere else in the city."

Friction point: The permit only covered the one-day event, and required the park to be taken down that same day.

Weeks later, the murals remain standing — which Hess attributed to logistical challenges and weather.
But Hess emphasized the group is "not battling the city" and still hopes to work together to make the project permanent.
Zoom out: Supporters say the park could turn city-owned land into a tourist attraction and year-round showcase for Richmond artists.

Hess says the roughly $500,000 proposal has been caught between overlapping agencies and unresolved questions over site control, maintenance, liability and graffiti.
City agencies didn't respond to Axios' requests for comment.
Meanwhile in Petersburg: City officials tell Axios they're planning a similar art walk beneath the MLK Jr. Bridge, which is estimated to take 6 months to create and cost $300,000-$350,000. A private developer would cover most of the cost.

"The city sees it as a win-win for the entire community," Petersburg councilman W. Howard Myers, who has helped shepherd the project, tells Axios.
Dave McCormack, the Petersburg project's developer, noted that "we don't have a lot of bureaucracy to overcome."
"It's really just implementation and funding."
What's next: Hess said organizers plan to reuse some of the temporary walls for future public events and donate at least one mural piece to the city "as a token of good faith."`,
  image: "https://images.axios.com/XqG7wemi4Gz3x5X7qM8-GDCUhkY=/0x0:1920x1080/1920x1080/2026/05/07/1778179938531.jpeg?w=3840",
  imageAlt: "Richmond approved a public art park pilot. Now it's stuck",
  link: "https://www.axios.com/local/richmond/2026/05/08/richmond-public-art-park-manchester-bridge-limbo"
};

const ARTICLE_14: NewsItem = {
  id: 14,
  title: "(ARTICLE) AFTER STRONG TURNOUT, RICHMOND ARTS PARK ENTERS HOLDING PATTERN",
  author: "R. Anthony Harris",
  date: "May 7, 2026",
  preview: "Under the Manchester Bridge, what had been an idea for years turned into something tangible, at least for a day.",
  content: `Under the Manchester Bridge, what had been an idea for years turned into something tangible, at least for a day.

Hundreds of people moved through the space as muralists painted, DJs played, and passersby stopped mid-bike ride or walk to figure out what was going on. By the end of the afternoon, the one-day test of a proposed arts park felt less like a trial and more like a preview.

“I don’t know how it could have gone better,” said artist Ian C. Hess, an event organizer with Little Giant Society and owner of Supply Art Store. “It was crazy. People showed up from pretty much the moment it started to the moment it ended. All types of Richmond were out there.”

For Hess, the scale of the turnout didn’t fully register until midway through the event, when Richmond Mayor Danny Avula stepped up to paint.

“I was talking to him about the spray paint, a German brand called Molotow, telling him, ‘I swear this isn’t going to explode, you’re good,’” Hess said, laughing. “We went over to one of the walls and he agreed to throw up a tag. Then he turned to me and asked, ‘Can I get a skinny cap?’ I was like, ‘Yes, sir.’”

“I was just focused on talking to him, not really thinking about anything else,” he said. “Then I turned around, and it was just a wall of phones. I was like, ‘Oh shit.’”

“That’s when it hit me how many people were actually out there,” he said. “It kind of stuck in my brain what it is that we’re actually doing.”

The event was designed as a proof of concept for a permanent “vibrant arts park,” an open, artist-led space built around rotating mural walls and public use. After more than three years of pushing the idea forward, Hess said the response answered the central question.

“Richmond is such a colorful place,” he added. “You give people a blank canvas, and they just make it their own and go crazy with it in the most beautiful way.”

The Activity Didn’t Stop
Although the event itself lasted only one afternoon, the space didn’t go quiet when it ended.

Temporary walls remained in place, and in the days that followed, artists continued to return, adding new pieces and drawing more visitors. What had been framed as a test continued to function as an active space.

“The thing about it being there a little bit longer is that it actually proves the concept works even more,” said organizer Ian Hess. “People have respected the murals. Graffiti hasn’t spread in mass to the surrounding area, which was one of the city government’s main concerns.”

Instead, he said, the activity has stayed largely contained to the walls themselves, with different types of use emerging naturally.

“I think thousands more people have come down there since,” Hess said. “The amount we’ve seen it shared and the new murals that have gone up, it’s crazy. You’ve got people spending time on big murals, and then you’ve got more community walls where people are just putting a couple things up. That separation is kind of baked in. It’s already there.”

The continued activity has also extended the reach of the project well beyond the initial crowd.

“Even after, with everything flying around on social media, people are still coming down there, seeking it out, making it a reason they love Richmond. It’s very special.”

Waiting on the City
Following the event, Hess said organizers have had direct conversations with city leadership about what it would take to move forward. According to Hess, Mayor Danny Avula expressed support and asked what obstacles remain.

He said those conversations reflect an effort to keep momentum going while also giving the city something visible in the short term.

“After the mayor gave his speech, he came to us and basically said, ‘Where are the roadblocks and how do we make this happen?’” Hess said.

The remaining hurdles are largely procedural, involving coordination between departments such as Parks and Recreation and the Department of Public Works, along with formal approval to use the land for a permanent installation.

“He said he heard us and that this is something that needs to happen,” Hess said. “But we’ve gotten nothing in the black. Nothing is seemingly written down.”

That has left organizers in what he described as a holding pattern, despite what they see as a clear public response.

“We just had an overwhelmingly successful event,” he said. “The mayor came down and painted at the same time that little kids were, professionals were, and every type of artist in between. It was everyone together as a community. It’s a win for the city. It’s a win for artists. It’s a win for everyone who loves art.”

“After almost four years, I don’t believe in waiting when working with the government,” Hess added. “I just don’t know what there is to wait for. I kind of don’t know, and that’s not a great answer, and it’s not a good feeling either.”

What Happens Next
In the short term, organizers are working with the city on what to do with the temporary infrastructure used for the event. Options under discussion include donating some of the walls to the city, placing others in community spaces, or reusing them for future activations.

“I think right now we’re trying to figure out what to do with the walls,” Hess said. “One of them we want to donate to the city. Another might go to a community center through Parks and Rec, and we’re talking about possibly placing a few on Broad Street during the upcoming tourism conference.”

At the same time, interest in the concept is beginning to extend beyond Richmond.

“There’s interest in a public art park in Petersburg,” said organizer Ian Hess. “And if something like that ends up happening there before it’s built here, that would be a tragedy. We’ve been at this for three and a half years now. It would be best to start it here in Richmond,” he said.

Hess said the response to the event has only reinforced his belief that the idea has broader potential.

“Every city with a creative scene is going to recognize how good this is for artists, and for people to actually experience the arts and meet the artists,” he said. “I don’t think there’s a better way. I think it becomes something pretty regular, in the same way there’s a playground outside of a school. It kind of just works, and the ways you can use it are unlimited.”

After three and a half years of planning, the project has now moved from concept to a real-world test, with visible public participation and continued use after the event ended.

“It’s just time to build,” he said. “It’s time to build it and stop talking about it.”`,
  image: "https://rvamag.com/wp-content/uploads/2026/05/Richmond-Art-Park-by-R-Anthony-Harris_RVA-Magazine-2026-3-",
  imageAlt: "After Strong Turnout, Richmond Arts Park Enters Holding Pattern",
  link: "https://rvamag.com/art/after-strong-turnout-richmond-arts-park-enters-holding-pattern.html"
};

const ARTICLE_15: NewsItem = {
  id: 15,
  title: "(ARTICLE) ‘WET WALLS’ EVENT IN RICHMOND SPARKS CREATIVITY ON BROAD STREET",
  author: "Vanessa Wigfall",
  date: "Jun 23, 2026 | 6:15 PM EST",
  preview: "RICHMOND, Va. — Broad Street is getting a burst of color this week as the Little Giant Society hosts “Wet Walls,\" a two-day community street art event aimed at re-imagining a long-blighted block in the city’s Arts District.",
  content: `RICHMOND, Va. — Broad Street is getting a burst of color this week as the Little Giant Society hosts “Wet Walls," a two-day community street art event aimed at re-imagining a long-blighted block in the city’s Arts District.

Four walls installed by Proof on the Park are being transformed by four main muralists: Eli McMullen, George Arturo, Ian C. Hess and Jadon Rowsom. An additional four walls are open for the public for community members to add their creativity, either by submitting a design in advance or simply arriving with paint in hand.

“This is a crazy experimental project,” said Hess, president of the nonprofit Little Giant Society and one of the event’s featured artists. “We wanted to show the best side of Richmond with creativity, even in a space that’s seen decades of decay. I think art is a sincere way to bridge that gap.”

The event overlaps with the Travel Bloggers Exchange (TBEX) conference, drawing visitors from around the world. Organizers hope the event will highlight the small businesses, galleries and partnerships that are in the heart of Richmond’s Arts District.

“We’re experimenting with adding more vibrancy to the area,” said Liz Kincaid, president of the Arts District Business Alliance. “This is a meaningful step forward showcasing to visitors and residents alike what RVA is capable of when we come together as a community.”

Located between 1st and 2nd streets on the north side of Broad, the event will run from 10 a.m. to 6 p.m. Tuesday and Wednesday, featuring live mural painting, community participation, music performances and local food offerings.

Afternoon music sets from Tristan Dougherty and the Heart Pines on Tuesday to Kassia Arbabi performing with guitarist on Wednesday aim to provide live music to the art-making festivities. The event is open to the public and free to attend.

Food offerings on Tuesday include complimentary pizza from Tarrant’s Cafe, with the first 50 slices free for attendees, and drinks from The Daily Coffee Co. and dishes from 1115 Mobile Kitchen on Wednesday.

Hess said the painted panels will eventually be auctioned off in September during a community fundraiser.

“We’ll frame these huge eight-by-12-foot pieces and make them available for auction,” he said. “I hope it leads to more murals, a lush, massive arts district that everybody wants to partake in and celebrate — right in the middle of the chaos.”

The event is supported by Richmond Economic Development and marks Little Giant Society’s first official partnership with the city. Founded in 2023, the nonprofit works to cultivate Richmond’s arts community and provide resources for both emerging and established artists.`,
  image: "https://ewscripps.brightspotcdn.com/dims4/default/c0ff506/2147483647/strip/true/crop/1920x1080+0+0/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2Fc0%2Fa0%2F484bfe6347b6a870bdf0e363dc76%2Femily-new-article-thumbnails-38.png",
  imageAlt: "Wet Walls event in Richmond sparks creativity on Broad Street",
  link: "https://www.wtvr.com/news/local-news/richmond/wet-walls-june-23-2026?shem=dsdf,sharefoc,agadiscoversdl,,sh/x/discover/m1/4"
};

const ARTICLE_16: NewsItem = {
  id: 16,
  title: "(ARTICLE) PHOTOS: WET WALLS ON BROAD STREET",
  author: "Richard Hayes",
  date: "June 25, 2026 | 12:00 PM EST",
  preview: "For the past two days artists have been making a little stretch of Broad Street more colorful. Little Giant Society and the Richmond Arts District brought together a group of artists to a vacant stretch of Broad Street for a little artification.",
  content: `For the past two days artists have been making a little stretch of Broad Street more colorful. Little Giant Society and the Richmond Arts District brought together a group of artists to a vacant stretch of Broad Street for a little artification.`,
  image: "https://s3.us-east-2.amazonaws.com/largefs.rvahubmedia/rvahub/wp-content/uploads/2026/06/wet_walls-15-768x614.jpg",
  imageAlt: "Photos: Wet Walls on Broad Street",
  link: "https://rvahub.com/2026/06/25/photos-wet-walls-on-broad-street/"
};

// Mock Data for remaining items
const MOCK_NEWS_DATA: NewsItem[] = [];

// Combine them
const NEWS_DATA: NewsItem[] = [
    ARTICLE_16,
    ARTICLE_15,
    ARTICLE_11,
    ARTICLE_12,
    ARTICLE_13,
    ARTICLE_14,
    ARTICLE_4, // Sep 22 2025 4:29 PM
    ARTICLE_8, // Sep 22 2025 10:58 AM
    ARTICLE_7, // Sep 4 2025
    ARTICLE_5, // Sep 3 2025
    ARTICLE_6, // Aug 21 2025
    ARTICLE_3, // May 19 2025
    ARTICLE_9, // May 13 2025
    LATEST_NEWS_ITEM, // Feb 3 2025
    ARTICLE_10, // Jan 3 2025
    ARTICLE_2, // Apr 22 2024
    ...MOCK_NEWS_DATA
];

const EVENTS_DATA: EventDetail[] = [
  {
    id: "park-raiser",
    date: "September 4, 2026",
    time: "12:00 PM to 12:00 AM",
    title: "Park Raiser",
    tagLine: "313 W. Broad St",
    description: "This upcoming First Friday September 4th from noon to midnight — we are hosting a huge, one day event right on Broad Street.",
    fullDescription: [
      "ANNOUNCING: 𝑷𝒂𝒓𝒌 𝑹𝒂𝒊𝒔𝒆𝒓!",
      "This upcoming First Friday September 4th from noon to midnight — we are hosting a huge, one day event right on Broad Street in between Field & Uptown Cheapskate right next to the new Greetings From Richmond mural. The space known as “The Galley” provided courtesy of Black Iris Social Club!",
      "That means live music all day, massive art pieces for auction, live murals, the Sticker Bus, open walls to paint, & drinks.",
      "While the Art will be on display & up for auction — new work will be made live during the event by these incredible Artists: Jesse Smith, J Ford, Tedi Kuma, Barry O’Keefe, & Anna Perdue",
      "Music Curated by: Tight Knit",
      "Music by: Ben Logik, Craunic, Dan Knots, David Goza, Erin Go Harp, Michael Quest, Riffa, Tedi, & Stretch Radio",
      "There’s only one way for this park to happen & it’s collectively creating a sustainable & prosperous Arts Community. We are building a transformative Art Park where all skill levels are welcome without fear of safety or persecution. A place that muralists, graffiti Artists, & the countless creatives of Richmond can gather to create & hone our craft. With your help — this becomes Richmond’s reality.",
      "See you on First Fridays!"
    ],
    image: "https://res.cloudinary.com/datad8tms/image/upload/v1787605810/PARKRAISER_jjorbn.png",
    imageAlt: "Park Raiser Event Placeholder"
  },
  {
    id: "park-raiser-2",
    date: "October 3, 2026",
    time: "TBD",
    title: "Park Raiser 2",
    tagLine: "TBD",
    description: "Details coming soon for Park Raiser 2.",
    fullDescription: ["More details will be provided soon for the Park Raiser 2 event."],
    image: "https://res.cloudinary.com/datad8tms/image/upload/v1787605810/PARKRAISER_jjorbn.png",
    imageAlt: "Park Raiser 2 Event Placeholder"
  }
];

// Custom Left-Facing School Bus Profile Icon
const CustomBusProfileIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    {/* Body */}
    <path d="M1 12 L3 7 L21 7 C22.1 7 23 7.9 23 9 L23 18 L21 18 C21 19.66 19.66 21 18 21 C16.34 21 15 19.66 15 18 L10 18 C10 19.66 8.66 21 7 21 C5.34 21 4 19.66 4 18 L1 18 Z" />
    {/* Windows */}
    <path d="M4 8 L6 11 H9 V8 H4 Z" fill="white" fillOpacity="0.2"/>
    <path d="M10 8 V11 H14 V8 H10 Z" fill="white" fillOpacity="0.2"/>
    <path d="M15 8 V11 H19 V8 H15 Z" fill="white" fillOpacity="0.2"/>
  </svg>
);

const Website: React.FC = () => {
  // Define section IDs in the order they appear on the page for correct scroll spying
  // Added 'news' between sponsors and events
  const sectionIds = ['hero', 'mission', 'proposal', 'proof-in-the-park', 'sticker-bus', 'about', 'sponsors', 'news', 'events', 'footer'];
  const activeSection = useScrollSpy(sectionIds, -200);
  
  // Modals
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>('loading');
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  // News State
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showAllNews, setShowAllNews] = useState(false);

  // Deep linking for events
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('event');
    if (eventId) {
      const event = EVENTS_DATA.find(e => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, []);

  // Carousel State for Home
  const [homeImageIndex, setHomeImageIndex] = useState(0);
  const [isHomePlaying, setIsHomePlaying] = useState(true);

  // Carousel State for The Park
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Carousel State for Proof in the Park
  const [proofImageIndex, setProofImageIndex] = useState(0);
  const [isProofPlaying, setIsProofPlaying] = useState(true);

  // Carousel State for Sticker Bus
  const [busImageIndex, setBusImageIndex] = useState(0);
  const [isBusPlaying, setIsBusPlaying] = useState(true);

  // Home Carousel Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isHomePlaying) {
      timer = setInterval(() => {
        setHomeImageIndex((prev) => (prev + 1) % HOME_CAROUSEL_IMAGES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isHomePlaying, homeImageIndex]);

  // Main Carousel Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentImageIndex]);

  // Proof Carousel Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isProofPlaying) {
      timer = setInterval(() => {
        setProofImageIndex((prev) => (prev + 1) % PROOF_CAROUSEL_IMAGES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isProofPlaying, proofImageIndex]);

  // Bus Carousel Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isBusPlaying) {
      timer = setInterval(() => {
        setBusImageIndex((prev) => (prev + 1) % BUS_IMAGES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isBusPlaying, busImageIndex]);

  // Home Carousel Handlers
  const handleHomeNext = () => {
    setHomeImageIndex((prev) => (prev + 1) % HOME_CAROUSEL_IMAGES.length);
  };
  const handleHomePrev = () => {
    setHomeImageIndex((prev) => (prev === 0 ? HOME_CAROUSEL_IMAGES.length - 1 : prev - 1));
  };
  const toggleHomePlay = () => setIsHomePlaying(!isHomePlaying);

  // Main Carousel Handlers
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };
  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  };
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Proof Carousel Handlers
  const handleProofNext = () => {
    setProofImageIndex((prev) => (prev + 1) % PROOF_CAROUSEL_IMAGES.length);
  };
  const handleProofPrev = () => {
    setProofImageIndex((prev) => (prev === 0 ? PROOF_CAROUSEL_IMAGES.length - 1 : prev - 1));
  };
  const toggleProofPlay = () => setIsProofPlaying(!isProofPlaying);

  // Bus Carousel Handlers
  const handleBusNext = () => {
    setBusImageIndex((prev) => (prev + 1) % BUS_IMAGES.length);
  };
  const handleBusPrev = () => {
    setBusImageIndex((prev) => (prev === 0 ? BUS_IMAGES.length - 1 : prev - 1));
  };
  const toggleBusPlay = () => setIsBusPlaying(!isBusPlaying);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    setSubscribeStatus('loading');
    setIsSubscribeModalOpen(true);

    try {
      const response = await fetch("https://formspree.io/f/xykzjjyz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubscribeStatus('success');
        form.reset();
      } else {
        setSubscribeStatus('error');
      }
    } catch (error) {
      setSubscribeStatus('error');
    }
  };

  const handleReadNews = (item: NewsItem) => {
    setSelectedNews(item);
    setIsNewsModalOpen(true);
  };

  // Determine displayed news based on "Show More" state
  const displayedNews = showAllNews ? NEWS_DATA : NEWS_DATA.slice(0, 3);
  const hiddenNewsCount = NEWS_DATA.length - 3;

  return (
    <div className="min-h-screen relative selection:bg-[#105CB3] selection:text-white">
      <Navigation activeSection={activeSection} onDonateClick={() => setIsDonateModalOpen(true)} />
      
      {/* Map Widget (Desktop Only) */}
      <MiniMap activeSection={activeSection} onSectionSelect={handleScrollToSection} />

      {/* Mobile Nav Controls (Mobile Only) */}
      <MobileNavControls activeSection={activeSection} sectionIds={sectionIds} onNavigate={handleScrollToSection} />

      {/* Donate Modal */}
      <DonateModal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} />

      {/* Events Modal */}
      <EventsModal isOpen={isEventsModalOpen} onClose={() => setIsEventsModalOpen(false)} events={EVENTS_DATA} />

      {/* Event Detail Modal */}
      <EventDetailModal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} event={selectedEvent} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Subscribe Modal */}
      <SubscribeModal 
        isOpen={isSubscribeModalOpen} 
        onClose={() => setIsSubscribeModalOpen(false)} 
        status={subscribeStatus} 
      />

      {/* Policy Modal */}
      <PolicyModal 
        isOpen={!!activePolicy} 
        onClose={() => setActivePolicy(null)} 
        type={activePolicy || 'privacy'} 
      />

      {/* News Modal */}
      <NewsModal 
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
        newsItem={selectedNews}
      />

      <main id="main-content" className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-8 md:pt-28 md:pb-12 relative scroll-mt-0">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            
            {/* TEXT CONTENT (Right on Desktop, Top on Mobile) */}
            <div className="space-y-6 md:space-y-8 lg:order-2">
              <div className="inline-flex items-center justify-center bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-widest mb-2 md:mb-4 leading-none">
                <span className="pt-[2px]">THROUGH LITTLE ACTIONS WE CREATE GIANTS.</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                Richmond's<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#388AE8] to-[#105CB3]">First Public</span><br/>
                Art Park.
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 max-w-lg leading-relaxed">
                At Little Giant Society, we are currently working with the City of Richmond to bring our vision for a Public Arts Park to life! This park will be installed south of the James River, underneath the Manchester Bridge, and on the Fall Line Trail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                 <button 
                   onClick={() => handleScrollToSection('proposal')}
                   className="bg-[#105CB3] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#0c4a91] transition-colors flex items-center justify-center leading-none focus:ring-4 focus:ring-blue-300 focus:outline-none focus-visible:ring-4"
                   aria-label="Learn more about the proposal"
                 >
                   <span className="pt-[2px]">Learn More</span>
                 </button>
                 <button 
                   onClick={() => window.open('https://www.change.org/p/it-s-time-to-build-richmond-s-1st-public-art-park?recruiter=1336850517&recruited_by_id=87f77e80-fe65-11ee-9f75-3ba1adb818af', '_blank')}
                   className="border-2 border-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center justify-center leading-none focus:ring-4 focus:ring-zinc-300 focus:outline-none focus-visible:ring-4"
                   aria-label="Sign the petition on Change.org (opens in new tab)"
                 >
                   <span className="pt-[2px]">Sign Petition</span>
                 </button>
              </div>
            </div>

            {/* IMAGE BLOCK (Left on Desktop, Bottom on Mobile) */}
            <div className="lg:order-1 relative w-full h-[320px] md:h-[400px] lg:h-[600px] bg-zinc-200 rounded-3xl overflow-hidden border-2 border-black group shadow-xl">
               <AnimatePresence mode="wait">
                 <motion.img 
                   key={homeImageIndex}
                   src={HOME_CAROUSEL_IMAGES[homeImageIndex]} 
                   alt={`Presentation slide ${homeImageIndex + 1}`} 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.8 }}
                   className="absolute inset-0 w-full h-full object-cover" 
                 />
               </AnimatePresence>

               {/* Controls Overlay - Gradient for visibility */}
               <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

               {/* Bottom Controls Row */}
               <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                 
                 {/* Left: Play/Pause, Nav Buttons & Indicators */}
                 <div className="flex items-center gap-6">
                   
                   {/* Controls Group */}
                   <div className="flex items-center gap-3">
                       <button 
                         onClick={toggleHomePlay}
                         className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                         aria-label={isHomePlaying ? "Pause Slideshow" : "Play Slideshow"}
                       >
                         {isHomePlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                       </button>

                       <button 
                         onClick={handleHomePrev}
                         className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                         aria-label="Previous Image"
                       >
                         <ChevronLeft size={22} />
                       </button>

                       <button 
                         onClick={handleHomeNext}
                         className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                         aria-label="Next Image"
                       >
                         <ChevronRight size={22} />
                       </button>
                   </div>

                   {/* Divider */}
                   <div className="w-px h-6 bg-white/20"></div>

                   {/* Indicators */}
                   <div className="flex gap-2" role="tablist" aria-label="Slideshow indicators">
                     {HOME_CAROUSEL_IMAGES.map((_, idx) => (
                       <button
                         key={idx} 
                         onClick={() => setHomeImageIndex(idx)}
                         className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${idx === homeImageIndex ? 'w-8 bg-white/40' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                         aria-label={`Go to slide ${idx + 1}`}
                         aria-selected={idx === homeImageIndex}
                         role="tab"
                       >
                          {/* Animated Progress Bar (Only visible when active) */}
                          {idx === homeImageIndex && (
                            <motion.div 
                              initial={{ width: "0%" }}
                              animate={{ width: isHomePlaying ? "100%" : "0%" }}
                              transition={{ duration: 5, ease: "linear" }}
                              className="absolute top-0 left-0 h-full bg-white"
                            />
                          )}
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Right: Label */}
                 <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                    <span className="font-mono text-xs uppercase tracking-wider text-white">
                      {`IMAGE ${homeImageIndex + 1}/${HOME_CAROUSEL_IMAGES.length}`}
                    </span>
                 </div>
               </div>
            </div>

          </div>
        </section>

        {/* 2. MISSION SECTION */}
        <section id="mission" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-white border-b border-black scroll-mt-20">
          <div className="max-w-4xl mx-auto w-full">
            
            {/* 1. SEPARATE LEFT-ALIGNED LABEL CONTAINER */}
            <div className="w-full text-left mb-8">
               <div className="flex items-center gap-2 text-zinc-900 font-bold uppercase tracking-widest">
                 <Flag size={20} fill="currentColor" />
                 <span>OUR MISSION</span>
               </div>
            </div>

            {/* 2. CENTERED CONTENT CONTAINER (Logo, Title, Body) */}
            <div className="w-full flex flex-col items-center text-center">
              {/* Logo Placeholder - Updated to correct Logo */}
              <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-zinc-100 rounded-full mb-8 flex items-center justify-center border-2 border-zinc-200 overflow-hidden shrink-0">
                 <img 
                    src="https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Logo_gezcwn.png" 
                    alt="Dark metal emblem featuring a robed female figure holding a sword and wheat, alongside an eagle within a wreath." 
                    className="w-full h-full object-cover"
                 />
              </div>

              <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8">
                THROUGH LITTLE ACTIONS.<br/>WE CREATE GIANTS.
              </h2>
              
              <p className="text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed mb-10 md:mb-16">
                Little Giant Society's main purpose is to cultivate and scale Richmond's thriving arts community by providing essential support, resources, and training for emerging talent and established artists.
              </p>
            </div>

            {/* 3 Rectangles (Left Aligned Text Grid) */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-left w-full">
              <div className="p-6 bg-[#EFF4F9] rounded-xl">
                 <h3 className="text-xl font-bold mb-4 uppercase flex items-center gap-3">
                   <DoorOpen size={24} className="shrink-0" />
                   <span>Open the Gates</span>
                 </h3>
                 <p className="text-zinc-600">Building inclusive Third Spaces that empower the creative community to collaborate and connect.</p>
              </div>
              <div className="p-6 bg-[#EFF4F9] rounded-xl">
                 <h3 className="text-xl font-bold mb-4 uppercase flex items-center gap-3">
                   <Sprout size={24} className="shrink-0" />
                   <span>Cultivate the Soil</span>
                 </h3>
                 <p className="text-zinc-600">Securing a dedicated sanctuary for Richmond’s street art scene to gather and evolve.</p>
              </div>
              <div className="p-6 bg-[#EFF4F9] rounded-xl">
                 <h3 className="text-xl font-bold mb-4 uppercase flex items-center gap-3">
                   <HandHeart size={24} className="shrink-0" />
                   <span>Give back</span>
                 </h3>
                 <p className="text-zinc-600">Providing mentorship and programs that equip the local artists to lead the next generation of talent.</p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. PROPOSAL SECTION (The Art Park) */}
        <section id="proposal" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-zinc-900 text-white relative overflow-hidden scroll-mt-20">
          
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
               <div className="space-y-6 md:space-y-8">
                  {/* Updated color for accessibility: #105CB3 -> #2994FF */}
                  <div className="flex items-center gap-2 text-[#2994FF] font-bold uppercase tracking-widest">
                    <MapPin size={20} />
                    <span>The Park</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
                    The Art Park<br/>Project
                  </h2>
                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                    With support from the city government, we are well on our way to creating a free Public Arts Park under the Manchester Bridge. This hub will reduce crime, boost tourism, and retain talent by reinforcing Richmond's status as a premier Arts City.
                  </p>
               </div>

               {/* Carousel */}
               <div className="aspect-square w-full rounded-2xl overflow-hidden relative group">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentImageIndex}
                      src={CAROUSEL_IMAGES[currentImageIndex]} 
                      alt={PARK_ALT_TEXTS[currentImageIndex]} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                  
                  {/* Controls Overlay - Gradient for visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

                  {/* Bottom Controls Row */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                    
                    {/* Left: Play/Pause, Nav Buttons & Indicators */}
                    <div className="flex items-center gap-6">
                      
                      {/* Controls Group */}
                      <div className="flex items-center gap-3">
                          <button 
                            onClick={togglePlay}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                          >
                            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                          </button>

                          <button 
                            onClick={handlePrev}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label="Previous Image"
                          >
                            <ChevronLeft size={22} />
                          </button>

                          <button 
                            onClick={handleNext}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label="Next Image"
                          >
                            <ChevronRight size={22} />
                          </button>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-6 bg-white/20"></div>

                      {/* Indicators */}
                      <div className="flex gap-2" role="tablist" aria-label="Slideshow indicators">
                        {CAROUSEL_IMAGES.map((_, idx) => (
                          <button
                            key={idx} 
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-white/40' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-selected={idx === currentImageIndex}
                            role="tab"
                          >
                             {/* Animated Progress Bar (Only visible when active) */}
                             {idx === currentImageIndex && (
                               <motion.div 
                                 initial={{ width: "0%" }}
                                 animate={{ width: isPlaying ? "100%" : "0%" }}
                                 transition={{ duration: 5, ease: "linear" }}
                                 className="absolute top-0 left-0 h-full bg-white"
                               />
                             )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Label */}
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                       <span className="font-mono text-xs uppercase tracking-wider text-white">
                         {PARK_LABELS[currentImageIndex]}
                       </span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Extended Detailed Copy */}
            <div className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-zinc-800 w-full">
               <div className="text-base md:text-lg text-zinc-300 leading-relaxed md:columns-2 gap-16">
                  <p className="mb-8 break-inside-avoid">
                    <span className="text-white font-bold">Our vision with this first major initiative is to</span> create a public arts park with the goal of it becoming a cultural landmark in the city. It will be free and open to any artist who lives in or is visiting Richmond (we believe that this type of project is ~35 years overdue). The city government constantly presents itself as an "Arts Forward City," and it's time to get our leaders to put their money where their mouth is.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    This project ties in perfectly with Richmond's Public Arts Master Plan and can set forth a new, more future-focused Richmond. Richmond is in a position to become a defining Arts city on the East Coast. When people think of the Arts in the United States, we want them to think of Richmond.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    A park with free, interactive walls will become a place where a father takes his son on the weekend to paint something together, a Girl Scout troop can make a design together and paint to earn a badge, a space where teens and young adults can hang out and paint without getting into any trouble, a place where local and international artists alike can spend a weekend mingling and painting. Ultimately, we strive to create an outdoor third Place where all are welcome, where the art is constantly changing and growing in a way that it becomes not only a training ground for future muralists but also a tourist destination that reflects Richmonders and our culture.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    International and domestic trends have proven that cities where a Public Arts Park has been constructed see general reductions in crime, vandalism, destruction of local businesses and homes, while also creating a space for new artists to emerge, careers to be made, and it promotes a public image that welcomes new blood and talent to these cities.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    According to Mural Arts of Philadelphia's comprehensive study (muralarts.org), Richmond is #4 in the nation for Public Arts. Other cities such as New York, Los Angeles, Portland, and more all recognize this. With this recognition from different towns, we humbly ask, "Why can't our city officials realize this?!" We feel that this represents a categorical failure of our city to capitalize on its reputation because currently, artists don't see Richmond as a place to prosper, but more like a stepping stone, and for decades, we have seen an exodus of talent, and it's time to do something about this.
                  </p>
                  <p className="mb-8 break-inside-avoid text-white font-medium border-l-2 border-[#105CB3] pl-6 italic">
                    This is why we are proposing a Public Arts Park (to be officially named by the public) and installed underneath the Manchester Bridge on the south side of the river, adjacent to the Flood Wall. Working alongside architect Katie Cortez, we have formally proposed this project to every single relevant department in the entire city and have gained support from the sitting Mayor, Danny Avula. NOW IS THE TIME!
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* 3.25 PROOF IN THE PARK SECTION (Duplicated from The Park) */}
        <section id="proof-in-the-park" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-[#101011] text-white relative overflow-hidden scroll-mt-20 border-t border-zinc-900">
          
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
               <div className="space-y-6 md:space-y-8">
                  {/* Reuse MapPin as it was requested to be identical structure */}
                  <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-widest">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 21H2M2 9h20M5 9v12M19 9v12M9 14.5a3 3 0 0 1 6 0" />
                    </svg>
                    <span>Proof In The Park</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
                    Proof In The<br/>Park
                  </h2>
                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                    On April 25, hundreds of Richmonders came down under the Manchester Bridge to paint, dance, and prove that a Public Arts Park belongs here. Mayor Danny Avula grabbed a can himself, and the city has now invited us to submit our full plan. The proof is in: Richmond wants this park.
                  </p>
               </div>

               {/* Carousel */}
               <div className="aspect-square w-full rounded-2xl overflow-hidden relative group shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={proofImageIndex}
                      src={PROOF_CAROUSEL_IMAGES[proofImageIndex]} 
                      alt={`Proof in the park photo ${proofImageIndex + 1}`} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                  
                  {/* Controls Overlay - Gradient for visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

                  {/* Bottom Controls Row */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                    
                    {/* Left: Play/Pause, Nav Buttons & Indicators */}
                    <div className="flex items-center gap-6">
                      
                      {/* Controls Group */}
                      <div className="flex items-center gap-3">
                          <button 
                            onClick={toggleProofPlay}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label={isProofPlaying ? "Pause Slideshow" : "Play Slideshow"}
                          >
                            {isProofPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                          </button>

                          <button 
                            onClick={handleProofPrev}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label="Previous Image"
                          >
                            <ChevronLeft size={22} />
                          </button>

                          <button 
                            onClick={handleProofNext}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label="Next Image"
                          >
                            <ChevronRight size={22} />
                          </button>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-6 bg-white/20"></div>

                      {/* Indicators */}
                      <div className="flex gap-2" role="tablist" aria-label="Slideshow indicators">
                        {PROOF_CAROUSEL_IMAGES.map((_, idx) => (
                          <button
                            key={idx} 
                            onClick={() => setProofImageIndex(idx)}
                            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${idx === proofImageIndex ? 'w-8 bg-white/40' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-selected={idx === proofImageIndex}
                            role="tab"
                          >
                             {/* Animated Progress Bar (Only visible when active) */}
                             {idx === proofImageIndex && (
                               <motion.div 
                                 initial={{ width: "0%" }}
                                 animate={{ width: isProofPlaying ? "100%" : "0%" }}
                                 transition={{ duration: 5, ease: "linear" }}
                                 className="absolute top-0 left-0 h-full bg-white"
                               />
                             )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Label */}
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                       <span className="font-mono text-xs uppercase tracking-wider text-white">
                         {`IMAGE ${proofImageIndex + 1}/${PROOF_CAROUSEL_IMAGES.length}`}
                       </span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Extended Detailed Copy */}
            <div className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-zinc-800 w-full">
               <div className="text-base md:text-lg text-zinc-300 leading-relaxed md:columns-2 gap-16">
                  <p className="mb-8 break-inside-avoid">
                    <span className="text-white font-bold">On Saturday, April 25</span>, we got our shot: a one-day, city-sanctioned trial run of the Public Arts Park, and Richmond showed up. From 12 to 5pm, hundreds of people flooded the space under the Manchester Bridge on the south side of the river, adjacent to the Flood Wall, to experience exactly what this park can and will be. The forecast called for rain. Richmond didn't care. The rain held off and the people came anyway.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    We built nine 8ft x 12ft walls and threw the doors open to everyone. This was a true open call: all artists, all makers, all skill levels, bring your own paint and your own ideas. Alongside the public, roughly ten of Richmond's heaviest hitters came to put in work, including Emily Herr, Eli McMullen, Nils Westergard, Jon Murrill, Earl Mack, Catie Lewis, Erek Jones, Jered Fykes, LOBOS, Steve Lahaye, George Arturo, and Tedi Kuma. DJs Dan Knots, JON JAR, Ran, and Profound79 kept the energy up all afternoon. Pros painted next to first-timers. Kids painted next to legends. This park is the place we have been talking about, and for one day, it was real.
                  </p>
                  <p className="mb-8 break-inside-avoid text-white font-medium border-l-2 border-[#22C55E] pl-6 italic">
                    And then the moment that says everything: Mayor Danny Avula came underneath the bridge, gave a speech, and when we handed him a can, he asked for a skinny cap and threw his own tag on the wall. It cannot be overstated what it means for the sitting Mayor of Richmond to stand in this space, see the vision, and literally put paint on it. Our city's leadership didn't just endorse this from a podium; they participated.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    None of this happened by accident. This event was three years in the making, built in collaboration with the Fall Line Trail, Bike Walk RVA, and the Manchester Alliance, with walls constructed by local carpenters Alé Melgar, Philip Meyer, and James Loving. The site sits at the crossroads of the Flood Wall, the Buttermilk Trail, and the Potterfield Bridge connections: thousands of Richmonders already pass through this space every week. On April 25, they finally had a reason to stop.
                  </p>
                  <p className="mb-8 break-inside-avoid text-white font-bold">
                    So what happens now? The big news: the city has formally given Little Giant Society permission to submit the full scope of our plan. Proof in the Park did exactly what it was designed to do. It proved to City Council, to city departments, and to every skeptic that this project is viable, safe, and wanted. The walls are painted. The community has spoken. <span className="text-green-400">NOW WE FINISH THE JOB!</span>
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* 3.5 STICKER BUS SECTION (Duplicated from The Park) */}
        {/* Changed bg from zinc-500 to zinc-950 to be darker than art park (900) but lighter than team (black) */}
        <section id="sticker-bus" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-zinc-950 text-white relative overflow-hidden scroll-mt-20 border-t border-zinc-900">
          
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
               <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-2 text-[#FACC15] font-bold uppercase tracking-widest drop-shadow-md">
                    <CustomBusProfileIcon size={20} className="drop-shadow-md" />
                    <span>The Sticker Bus</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
                    The Sticker Bus
                  </h2>
                  <ul className="space-y-4 text-zinc-100 text-lg md:text-xl leading-relaxed">
                    <li className="flex items-start gap-3">
                        <span className="text-[#FACC15] mt-2.5 w-2 h-2 rounded-full bg-[#FACC15] shrink-0 drop-shadow-sm"></span>
                        <span><strong className="text-white">200+ Artists:</strong> Plastered head-to-tailpipe in work from Shepard Fairey, RxSkulls, and the global scene.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#FACC15] mt-2.5 w-2 h-2 rounded-full bg-[#FACC15] shrink-0 drop-shadow-sm"></span>
                        <span><strong className="text-white">Sealed Forever:</strong> Every slap is coated in automotive clear coat to survive the streets.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#FACC15] mt-2.5 w-2 h-2 rounded-full bg-[#FACC15] shrink-0 drop-shadow-sm"></span>
                        <span><strong className="text-white">Built to Drive:</strong> Fully mobile, AC-blasting, and ready to haul art to the people.</span>
                    </li>
                  </ul>
               </div>

               {/* Carousel */}
               <div className="aspect-square w-full rounded-2xl overflow-hidden relative group">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={busImageIndex}
                      src={BUS_IMAGES[busImageIndex]} 
                      alt={BUS_ALT_TEXTS[busImageIndex]} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                  
                  {/* Controls Overlay - Gradient for visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

                  {/* Bottom Controls Row */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                    
                    {/* Left: Play/Pause, Nav Buttons & Indicators */}
                    <div className="flex items-center gap-6">
                      
                      {/* Controls Group */}
                      <div className="flex items-center gap-3">
                          <button 
                            onClick={toggleBusPlay}
                            className="text-white hover:text-[#FACC15] transition-colors focus:outline-none focus:text-[#FACC15] focus-visible:ring-2"
                            aria-label={isBusPlaying ? "Pause Slideshow" : "Play Slideshow"}
                          >
                            {isBusPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                          </button>

                          <button 
                            onClick={handleBusPrev}
                            className="text-white hover:text-[#FACC15] transition-colors focus:outline-none focus:text-[#FACC15] focus-visible:ring-2"
                            aria-label="Previous Image"
                          >
                            <ChevronLeft size={22} />
                          </button>

                          <button 
                            onClick={handleBusNext}
                            className="text-white hover:text-[#FACC15] transition-colors focus:outline-none focus:text-[#FACC15] focus-visible:ring-2"
                            aria-label="Next Image"
                          >
                            <ChevronRight size={22} />
                          </button>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-6 bg-white/20"></div>

                      {/* Indicators */}
                      <div className="flex gap-2" role="tablist" aria-label="Slideshow indicators">
                        {BUS_IMAGES.map((_, idx) => (
                          <button
                            key={idx} 
                            onClick={() => setBusImageIndex(idx)}
                            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${idx === busImageIndex ? 'w-8 bg-white/40' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-selected={idx === busImageIndex}
                            role="tab"
                          >
                             {/* Animated Progress Bar (Only visible when active) */}
                             {idx === busImageIndex && (
                               <motion.div 
                                 initial={{ width: "0%" }}
                                 animate={{ width: isBusPlaying ? "100%" : "0%" }}
                                 transition={{ duration: 5, ease: "linear" }}
                                 className="absolute top-0 left-0 h-full bg-[#FACC15]"
                               />
                             )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Label */}
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                       <span className="font-mono text-xs uppercase tracking-wider text-white">
                         {BUS_LABELS[busImageIndex]}
                       </span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 4. ABOUT / TEAM SECTION */}
        <section id="about" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-black text-white border-b border-zinc-800 scroll-mt-20 overflow-hidden relative">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="mb-10 md:mb-16 space-y-6 md:space-y-8">
               {/* TEAM LABEL - Replaced Icon with Users */}
               <div className="flex items-center gap-2 text-[#2994FF] font-bold uppercase tracking-widest">
                  <Users size={20} />
                  <span>THE TEAM</span>
               </div>
               
               {/* Updated Header: Removed Icon, removed period, changed color to white */}
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                 Team
               </h2>
            </div>

            {/* TEAM MEMBERS GRID */}
            <div className="grid md:grid-cols-3 gap-8 items-start">
               {TEAM_MEMBERS.map((member, i) => (
                 <div key={i} className="group relative">
                   
                   {/* Card / Pedestal */}
                   <div className="h-[400px] w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative flex flex-col items-center justify-center">
                      
                      {/* 3D Element */}
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Model3D src={member.modelSrc} alt={member.alt} />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none"></div>
                   </div>

                   {/* Label & Blurb */}
                   <div className="mt-6 text-center">
                      <h3 className="text-2xl font-bold uppercase tracking-tight">{member.name}</h3>
                      {/* Applied specific blue color #77B3F7 to the role */}
                      <p className="text-[#77B3F7] font-medium text-sm uppercase tracking-wider mb-4">{member.role}</p>
                      <p className="text-zinc-300 text-[1rem] leading-relaxed text-left px-2">
                        {member.blurb}
                      </p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* 5. SPONSORS SECTION */}
        <section id="sponsors" className="min-h-screen flex flex-col items-center justify-center px-6 py-16 md:py-24 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full space-y-16 md:space-y-32">
            
            {/* PARTNERS BLOCK (Top - 5 Logos) */}
            <div>
                <div className="text-center mb-8 md:mb-12">
                   <div className="inline-flex items-center justify-center p-3 bg-zinc-100 rounded-full mb-6">
                     <Handshake className="text-[#105CB3]" size={24} />
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                     Our Partners
                   </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                   {PARTNER_LOGOS.map((partner, i) => (
                     <div key={i} className="group w-[calc(50%-0.5rem)] md:w-[calc(20%-1.6rem)] aspect-[4/3] bg-[#105CB3] flex items-center justify-center transition-all duration-500 hover:bg-blue-950 hover:shadow-lg border border-transparent hover:border-black/5 rounded-lg p-1">
                        <img src={partner.src} alt={partner.alt} className="w-full h-full object-contain transition-all duration-500" />
                     </div>
                   ))}
                </div>
            </div>

            {/* SPONSORS BLOCK (Bottom - 17 Logos) */}
            <div>
                <div className="text-center mb-8 md:mb-12">
                   <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                     Our Sponsors
                   </h2>
                </div>

                {/* Changed to Flex for centering the last row items */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                   {SPONSOR_LOGOS.map((sponsor, i) => (
                     <div 
                        key={i} 
                        className="group w-[calc(50%-0.5rem)] md:w-[calc(20%-1.6rem)] aspect-[4/3] bg-zinc-900 flex items-center justify-center transition-all duration-500 hover:bg-black hover:shadow-lg border border-transparent hover:border-zinc-800 rounded-lg p-1"
                     >
                        <img src={sponsor.src} alt={sponsor.alt} className="w-full h-full object-contain transition-all duration-500" />
                     </div>
                   ))}
                </div>
            </div>
            
          </div>
        </section>

        {/* 6. NEWS SECTION (NEW) */}
        <section id="news" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-[#105CB3] border-b border-black scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-end justify-between mb-10 md:mb-16 border-b-2 border-white/20 pb-8">
               <div>
                 <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest mb-4">
                    <Newspaper size={20} />
                    <span>News</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                    Recent<br/>News
                  </h2>
               </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
               {displayedNews.map((item) => (
                 <div key={item.id} className="group bg-[#EFF4F9] border border-black/10 p-8 rounded-xl hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-2 flex flex-col h-full">
                    
                    {/* Image */}
                    <div className="w-full aspect-video bg-zinc-200 rounded-lg overflow-hidden mb-6 border border-black/5">
                        <img 
                            src={item.image} 
                            alt={item.imageAlt || item.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#105CB3] mb-4">
                        <span className="bg-white/50 px-2 py-1 rounded">{item.date}</span>
                        <span className="text-zinc-400">•</span>
                        {/* Updated color for accessibility: text-zinc-500 -> text-zinc-800 */}
                        <span className="text-zinc-800">{item.author}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-[#105CB3] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-zinc-600 mb-8 line-clamp-3 text-sm leading-relaxed flex-grow">
                      {item.preview}
                    </p>
                    
                    <button 
                        onClick={() => handleReadNews(item)}
                        className="w-full bg-white text-black border border-black/10 font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      Read Article <ArrowRight size={16} />
                    </button>
                 </div>
               ))}
            </div>

            {/* Show More / Show Less Buttons */}
            {NEWS_DATA.length > 3 && (
                <div className="flex justify-center">
                    {showAllNews ? (
                        <button 
                            onClick={() => setShowAllNews(false)}
                            className="bg-white text-[#105CB3] px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors shadow-lg shadow-black/10 flex items-center gap-2"
                        >
                            Show Less <ChevronUp size={18} />
                        </button>
                    ) : (
                        <button 
                            onClick={() => setShowAllNews(true)}
                            className="bg-white text-[#105CB3] px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors shadow-lg shadow-black/10 flex items-center gap-2"
                        >
                            Show More News ({hiddenNewsCount}) <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            )}
          </div>
        </section>

        {/* 7. EVENTS SECTION */}
        <section id="events" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-[#D6E8FC] border-b border-black scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-end justify-between mb-10 md:mb-16 border-b-2 border-black/10 pb-8">
               <div>
                 <div className="flex items-center gap-2 text-zinc-700 font-bold uppercase tracking-widest mb-4">
                    <Calendar size={20} />
                    <span>Events</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black">
                    Upcoming<br/>Events
                  </h2>
               </div>
               <button 
                onClick={() => setIsEventsModalOpen(true)}
                className="hidden md:flex items-center gap-2 font-bold uppercase tracking-wider hover:translate-x-2 transition-transform focus:outline-none focus:underline"
                aria-label={`View full calendar, ${EVENTS_DATA.length} events`}
               >
                 Full Calendar ({EVENTS_DATA.length}) <ArrowRight size={16} />
               </button>
            </div>

            {EVENTS_DATA.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EVENTS_DATA.slice(0, 3).map((event, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedEvent(event)}
                        className="group bg-[#EFF4F9] border border-black/10 p-8 rounded-3xl hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                      >
                        {event.image && (
                          <div className="w-full aspect-video bg-zinc-200 rounded-2xl overflow-hidden mb-6 border border-black/5 relative flex items-center justify-center">
                            <img 
                              src={event.image} 
                              alt={event.imageAlt || "Event image"} 
                              className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${event.id === 'park-raiser-2' ? 'blur-md opacity-75' : ''}`}
                            />
                            {event.id === 'park-raiser-2' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <span className="text-white text-2xl md:text-3xl font-black uppercase tracking-widest drop-shadow-md text-center transform -rotate-12">Coming Soon!</span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#105CB3] mb-4">
                            <span className="bg-white/50 px-2 py-1 rounded">{event.date}</span>
                            {event.time && (
                              <>
                                <span className="text-zinc-400">•</span>
                                <span className="text-zinc-800">{event.time}</span>
                              </>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-[#105CB3] transition-colors leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-zinc-600 mb-8 line-clamp-3 text-sm leading-relaxed flex-grow">
                          {event.description}
                        </p>
                        <button className="w-full bg-white text-black border border-black/10 font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                          View Details <ArrowRight size={16} />
                        </button>
                      </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-black/10 rounded-2xl bg-white/50">
                    <Calendar size={48} className="text-zinc-700 mb-4" />
                    {/* Updated color for accessibility: text-zinc-400 -> text-zinc-700 */}
                    <p className="text-xl font-bold text-zinc-700 uppercase tracking-widest">No Upcoming Events</p>
                </div>
            )}
          </div>
        </section>

      </main>

      {/* FOOTER - Moved outside main landmark */}
      <footer id="footer" aria-label="Site Footer" className="bg-[#050810] py-12 md:py-20 px-6 text-white relative z-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
               <div className="flex items-center gap-3 mb-6">
                  {/* Footer Logo - Updated to correct Logo */}
                  <div className="relative w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-white">
                    <img 
                      src="https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Logo_gezcwn.png" 
                      alt="Dark metal emblem featuring a robed female figure holding a sword and wheat, alongside an eagle within a wreath." 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const fallback = (e.target as HTMLImageElement).nextElementSibling;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-zinc-800 rounded-full flex items-center justify-center">
                       <span className="text-zinc-400 font-bold text-[10px]">LGS</span>
                    </div>
                  </div>
                  <span className="font-bold uppercase tracking-widest text-white">Little Giant Society</span>
               </div>
               {/* Updated text color: text-zinc-400 -> text-zinc-300 */}
               <p className="max-w-xs text-zinc-300 mb-8">
                 A 501(c)3 Non-Profit creating Richmond’s 1st Public Art Park & dedicated to essential creative support.
               </p>
               <form 
                  onSubmit={handleSubscribe}
                  className="flex gap-4"
                  aria-label="Newsletter Subscription"
               >
                 <label htmlFor="footer-email" className="sr-only">Email Address</label>
                 {/* Updated placeholder color: placeholder-zinc-500 -> placeholder-zinc-400 */}
                 <input 
                    id="footer-email"
                    type="email" 
                    name="email"
                    required
                    placeholder="Enter your email" 
                    className="bg-transparent border-b border-white/40 py-2 focus:outline-none w-full max-w-xs placeholder-zinc-400 text-white focus:border-white transition-colors" 
                  />
                 <button type="submit" className="font-bold uppercase tracking-wider text-sm hover:underline text-white focus:outline-none focus:underline">Subscribe</button>
               </form>
            </div>
            <div>
              {/* Corrected heading hierarchy: h4 -> h3 */}
              <h3 className="font-bold uppercase tracking-widest mb-6 text-white">Sitemap</h3>
              {/* Updated text color: text-zinc-400 -> text-zinc-300 */}
              <ul className="space-y-4 text-zinc-300">
                <li><a href="#hero" className="hover:text-white transition-colors focus:text-white">Home</a></li>
                <li><a href="#mission" className="hover:text-white transition-colors focus:text-white">Mission</a></li>
                <li>
                  <a href="#proposal" className="hover:text-white transition-colors focus:text-white block mb-2">Projects</a>
                  <ul className="pl-4 space-y-2 border-l border-white/20">
                    <li><a href="#proposal" className="hover:text-white transition-colors focus:text-white text-sm">The Park</a></li>
                    <li><a href="#proof-in-the-park" className="hover:text-white transition-colors focus:text-white text-sm">Proof In The Park</a></li>
                    <li><a href="#sticker-bus" className="hover:text-white transition-colors focus:text-white text-sm">Sticker Bus</a></li>
                  </ul>
                </li>
                <li><a href="#about" className="hover:text-white transition-colors focus:text-white">Team</a></li>
                <li><a href="#sponsors" className="hover:text-white transition-colors focus:text-white">Partners</a></li>
                <li><a href="#news" className="hover:text-white transition-colors focus:text-white">News</a></li>
                <li><a href="#events" className="hover:text-white transition-colors focus:text-white">Events</a></li>
              </ul>
            </div>
            <div>
              {/* Corrected heading hierarchy: h4 -> h3 */}
              <h3 className="font-bold uppercase tracking-widest mb-6 text-white">Connect</h3>
              {/* Updated text color: text-zinc-400 -> text-zinc-300 */}
              <ul className="space-y-4 text-zinc-300">
                <li><a href="https://www.instagram.com/little.giant.society/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus:text-white" aria-label="Instagram">Instagram</a></li>
                <li>
                  <button onClick={() => setIsContactModalOpen(true)} className="hover:text-white transition-colors focus:text-white text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* Updated text color: text-zinc-400 -> text-zinc-300 */}
          <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col items-center text-sm text-zinc-300 gap-4">
             <div className="flex gap-6">
               {/* Updated hover/focus color for accessibility: text-zinc-300 -> text-zinc-100 */}
               <button onClick={() => setActivePolicy('privacy')} className="hover:text-zinc-100 transition-colors focus:text-zinc-100">Privacy Policy</button>
               <button onClick={() => setActivePolicy('terms')} className="hover:text-zinc-100 transition-colors focus:text-zinc-100">Terms of Service</button>
               <button onClick={() => setActivePolicy('cookie')} className="hover:text-zinc-100 transition-colors focus:text-zinc-100">Cookie Policy</button>
             </div>
             <span>© 2026 Little Giant Society. All rights reserved.</span>
          </div>
        </footer>

    </div>
  );
};

export default Website;