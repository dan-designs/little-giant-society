import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Users, Handshake, ChevronLeft, ChevronRight, ChevronUp, Play, Pause, Quote, DoorOpen, Sprout, HandHeart } from 'lucide-react';
import Navigation from './components/Navigation';
import MiniMap from './components/MiniMap';
import MobileNavControls from './components/MobileNavControls';
import DonateModal from './components/DonateModal';
import EventsModal from './components/EventsModal';
import ContactModal from './components/ContactModal';
import PolicyModal, { PolicyType } from './components/PolicyModal';
import SubscribeModal, { SubscribeStatus } from './components/SubscribeModal';
import NewsModal, { NewsItem } from './components/NewsModal';
import Model3D from './components/Model3D';
import { useScrollSpy } from './hooks/useScrollSpy';
import { MAP_SECTIONS } from './constants';

const CAROUSEL_IMAGES = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/Art-Park-Render_rgklby.png",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/plan-1_qyrmng.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/plan-3_nkstly.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/plan-2_rclxza.avif"
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

const BUS_LABELS = [
  "SB Supply",
  "SB FF 1",
  "SB FF 2"
];

const PARTNER_LOGOS = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/FallLine_zh1gia.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Gallery5_frdtns.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Manchester_Alliance_kfpqog.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Supply_fbkorw.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Veil_w4myou.avif"
];

const SPONSOR_LOGOS = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/AndDimSum_meazig.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Atlantic_Union_Bank_logoSQ_wqyvmg.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Bombolini_uqkk7h.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/CNTR_oqgdwl.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/communityfoundation_rrd2rx.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/Dawnstar_jhh6fu.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/Envelope_p0tagc.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766278510/FoyerGallery_nvpbww.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/ILYSM_ecg3zl.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/LivelyHarper_b51lnh.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/RPAA_hvtuke.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/RVA_dzxgvt.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/ShockoeArts_un1kc5.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/Tarrants_cqfagk.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/TrialandError_hetr2z.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/ViragoSpirits_arrtin.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Waxmoon_vvidks.avif"
];

const TEAM_MEMBERS = [
  {
    name: "Ian C. Hess",
    role: "President/Director",
    modelSrc: "https://little-giant-society.sirv.com/model.glb",
    blurb: "Ian C. Hess is the business owner of SUPPLY, Richmond's only locally owned Art Supply Store. He is also the President and Director of Little Giant Society and an internationally exhibiting Fine Art painter who has shown work in Rome, Amsterdam, Philadelphia, and at Art Basel in Miami. Ian is a native Richmonder who is wholly dedicated to creating a flourishing arts community in Richmond."
  },
  {
    name: "Kathleen Cortez",
    role: "Vice President/Treasurer",
    modelSrc: "https://little-giant-society.sirv.com/Katie.glb",
    blurb: "If we have eyes to see, our spaces illustrate for us the dialog between beauty, place, and culture. Katie operates her own Architecture practice with a focus on emphasizing the power of design, space, and place. A native of Pennsylvania, Katie studied Architecture at Lehigh University, and moved to Richmond 15 years ago after earning her Master's Degree in Architecture at the University of Virginia."
  },
  {
    name: "Ben White",
    role: "Secretary/Marketing Director",
    modelSrc: "https://little-giant-society.sirv.com/Ben.glb",
    blurb: "Benjamin White, a Richmond, Virginia native, works as a commercial photographer, continually looking for new avenues to progress his vision through the lens. Utilizing digital and film mediums, Ben focuses on commercial portrait, product, and event photography."
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

Folks were able to add stickers to the bus outside of the Byrd Theatre earlier this month for the premiere of the “Sticker Movie,” which dives into the history and culture of sticker making.

There will be another chance to add stickers to the bus Friday during the exhibit’s closing reception and free jazz night at Gallery5.

Stickers featured in “Hello My Name Is” are available for sale at littlegiantsociety.org/donate. Smaller pieces are $120 and large pieces are $500. Some of the proceeds will go toward raising funds for the art park, which is still awaiting approval from the city.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545723/Article7_snxzot.avif",
  link: "https://richmond.com/news/local/article_6b168d4b-68a5-49a1-ac12-6b4bdb2b5eb0.html"
};

// Fifth Specific News Item
const ARTICLE_5: NewsItem = {
  id: 5,
  title: "(ARTICLE) CBS 6 - RICHMOND ARTIST'S 'HELLO MY NAME IS' PROJECT SPOTLIGHTS STICKER CULTURE",
  author: "Andrew Cothern",
  date: "Sep 03, 2025 | 7:53 AM EST",
  preview: "RICHMOND, Va. — Richmond artist Ian Hess is kicking off a month-long, multi-layered art project that puts sticker culture in the spotlight.",
  content: `RICHMOND, Va. — Richmond artist Ian Hess is kicking off a month-long, multi-layered art project that puts sticker culture in the spotlight.

The series “Hello My Name Is,” which kicks off at Gallery5 during the First Friday art walk, is an exhibition highlighting sticker culture as an art form featuring more than 270 artists from around the world.

Hess, known for his work with Little Giant Society, Supply RVA, and the development of the Manchester Art Park (for which he was named one of Style Weekly’s people to watch in the arts in last year’s Fall Arts Preview), saw the similarities of name tags at office parties and networking events to the artistic ways of sticker making. Click here to keep reading on Style Weekly.`,
  image: "https://res.cloudinary.com/datad8tms/image/upload/v1767545722/Article6_asem0y.avif",
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
  link: "https://rvamag.com/art/ian-hess-on-painting-myths-selling-dreams-and-surviving-richmond.html"
};

// Mock Data for remaining items
const MOCK_NEWS_DATA: NewsItem[] = [];

// Combine them
const NEWS_DATA: NewsItem[] = [
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

const EVENTS_DATA: any[] = [];

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
  const sectionIds = ['hero', 'mission', 'proposal', 'sticker-bus', 'about', 'sponsors', 'news', 'events', 'footer'];
  const activeSection = useScrollSpy(sectionIds, -200);
  
  // Modals
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>('loading');
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  // News State
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showAllNews, setShowAllNews] = useState(false);

  // Carousel State for The Park
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Carousel State for Sticker Bus
  const [busImageIndex, setBusImageIndex] = useState(0);
  const [isBusPlaying, setIsBusPlaying] = useState(true);

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

  // Main Carousel Handlers
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };
  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  };
  const togglePlay = () => setIsPlaying(!isPlaying);

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

      <main className="relative z-10">
        
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
               <img 
                 src="https://res.cloudinary.com/datad8tms/image/upload/v1766276535/Art-Park-Render_rgklby.png" 
                 alt="Art Park Render" 
                 className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>
               
               <div className="absolute bottom-6 left-6 bg-white px-4 py-2 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="font-bold text-xs uppercase tracking-widest">Art Park Render</span>
               </div>
            </div>

          </div>
        </section>

        {/* 2. MISSION SECTION */}
        <section id="mission" className="min-h-screen flex items-center px-6 py-16 md:py-24 bg-white border-b border-black scroll-mt-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Logo Placeholder - Updated to correct Logo */}
            <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-zinc-100 rounded-full mb-8 flex items-center justify-center border-2 border-zinc-200 overflow-hidden shrink-0">
               <img 
                  src="https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Logo_gezcwn.png" 
                  alt="Little Giant Society Logo" 
                  className="w-full h-full object-cover"
               />
            </div>

            <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8">
              THROUGH LITTLE ACTIONS.<br/>WE CREATE GIANTS.
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-16">
              Little Giant Society's main purpose is to cultivate and scale Richmond's thriving arts community by providing essential support, resources, and training for emerging talent and established artists.
            </p>

            {/* 3 Rectangles */}
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
                 <p className="text-zinc-600">Providing mentorship and programs that equip local youth to lead the next generation of art.</p>
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
                  <div className="flex items-center gap-2 text-[#105CB3] font-bold uppercase tracking-widest">
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
                      alt={`Render view ${currentImageIndex + 1}`} 
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
                      alt={`Render view ${busImageIndex + 1}`} 
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
                         {BUS_LABELS[busImageIndex]}
                       </span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Extended Detailed Copy */}
            <div className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-zinc-800 w-full">
               <div className="text-base md:text-lg text-zinc-100 leading-relaxed md:columns-2 gap-16">
                  <p className="mb-8 break-inside-avoid">
                    <span className="text-white font-bold">Art takes many forms, but few are as dynamic [or mobile] as Richmond’s new "Sticker Bus."</span> Masterminded by artist Ian Hess and the non-profit Little Giants Society, this project transforms a surplus school bus purchased at auction into a rolling, community-powered installation.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    The concept was born from the "Hello My Name Is" exhibition, a showcase where over 200 artists [including street art icons like Shepard Fairey and RxSkulls] transformed standard shipping labels into miniature masterpieces which were sold to raise funds for the Little Giants Society's Art Park project.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    Taking that creative energy to the streets, the bus is now being covered entirely in stickers donated by artists and community members from around the globe. The design acts as a curated collage, anchored by a custom skull piece on the hood by Richmond artist Noah Scalin.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    Once the sticker application is complete, the bus will be sealed in a professional automotive finish to preserve the work against the elements. However, the Sticker Bus is designed to be used, not just viewed. With a reliable engine and new tires, the vehicle has become a Richmond icon serving as a mobile pop-up for First Fridays that will one day provide transportation to and from the Manchester Art Park.
                  </p>
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
            <div className="mb-10 md:mb-16">
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
                         <Model3D src={member.modelSrc} alt={`3D Scan of ${member.name}`} />
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
                   {PARTNER_LOGOS.map((logo, i) => (
                     <div key={i} className="group w-[calc(50%-0.5rem)] md:w-[calc(20%-1.6rem)] aspect-[4/3] bg-[#105CB3] flex items-center justify-center transition-all duration-500 hover:bg-blue-950 hover:shadow-lg border border-transparent hover:border-black/5 rounded-lg p-1">
                        <img src={logo} alt={`Partner Logo ${i + 1}`} className="w-full h-full object-contain transition-all duration-500" />
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
                   {SPONSOR_LOGOS.map((logo, i) => (
                     <div 
                        key={i} 
                        className="group w-[calc(50%-0.5rem)] md:w-[calc(20%-1.6rem)] aspect-[4/3] bg-zinc-900 flex items-center justify-center transition-all duration-500 hover:bg-black hover:shadow-lg border border-transparent hover:border-zinc-800 rounded-lg p-1"
                     >
                        <img src={logo} alt={`Sponsor Logo ${i + 1}`} className="w-full h-full object-contain transition-all duration-500" />
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
                    <span className="material-symbols-outlined text-[20px]">newspaper</span>
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
                            alt={item.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#105CB3] mb-4">
                        <span className="bg-white/50 px-2 py-1 rounded">{item.date}</span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-zinc-500">{item.author}</span>
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
                 <div className="flex items-center gap-2 text-zinc-600 font-bold uppercase tracking-widest mb-4">
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
                     <div key={i} className="group bg-white border border-black/10 p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="text-xs font-bold bg-zinc-100 text-zinc-500 px-3 py-1 inline-block rounded-full mb-6">
                          {event.date}
                        </div>
                        <h3 className="text-3xl font-bold mb-4 group-hover:underline decoration-2 underline-offset-4 text-black">
                          {event.title}
                        </h3>
                        <p className="text-zinc-500 mb-6 line-clamp-3">
                          {event.description}
                        </p>
                        <button className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-400 cursor-not-allowed">
                          Details Coming Soon
                        </button>
                     </div>
                   ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-black/10 rounded-2xl bg-white/50">
                    <Calendar size={48} className="text-zinc-300 mb-4" />
                    <p className="text-xl font-bold text-zinc-400 uppercase tracking-widest">No Upcoming Events</p>
                </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="footer" className="bg-[#050810] py-12 md:py-20 px-6 text-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
               <div className="flex items-center gap-3 mb-6">
                  {/* Footer Logo - Updated to correct Logo */}
                  <div className="relative w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-white">
                    <img 
                      src="https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Logo_gezcwn.png" 
                      alt="LGS Logo" 
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
               <p className="max-w-xs text-zinc-400 mb-8">
                 A 501(c)3 Non-Profit creating Richmond’s 1st Public Art Park & dedicated to essential creative support.
               </p>
               <form 
                  onSubmit={handleSubscribe}
                  className="flex gap-4"
               >
                 <label htmlFor="footer-email" className="sr-only">Email Address</label>
                 <input 
                    id="footer-email"
                    type="email" 
                    name="email"
                    required
                    placeholder="Enter your email" 
                    className="bg-transparent border-b border-white/40 py-2 focus:outline-none w-full max-w-xs placeholder-zinc-500 text-white focus:border-white transition-colors" 
                  />
                 <button type="submit" className="font-bold uppercase tracking-wider text-sm hover:underline text-white focus:outline-none focus:underline">Subscribe</button>
               </form>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-6 text-white">Sitemap</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#hero" className="hover:text-white transition-colors focus:text-white">Home</a></li>
                <li><a href="#mission" className="hover:text-white transition-colors focus:text-white">Mission</a></li>
                <li><a href="#about" className="hover:text-white transition-colors focus:text-white">Team</a></li>
                <li><a href="#proposal" className="hover:text-white transition-colors focus:text-white">The Proposal</a></li>
                <li><a href="#news" className="hover:text-white transition-colors focus:text-white">News</a></li>
                <li><a href="#events" className="hover:text-white transition-colors focus:text-white">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-6 text-white">Connect</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="https://www.instagram.com/little.giant.society/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus:text-white" aria-label="Instagram">Instagram</a></li>
                <li>
                  <button onClick={() => setIsContactModalOpen(true)} className="hover:text-white transition-colors focus:text-white text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col items-center text-sm text-zinc-500 gap-4">
             <div className="flex gap-6">
               <button onClick={() => setActivePolicy('privacy')} className="hover:text-zinc-300 transition-colors focus:text-zinc-300">Privacy Policy</button>
               <button onClick={() => setActivePolicy('terms')} className="hover:text-zinc-300 transition-colors focus:text-zinc-300">Terms of Service</button>
               <button onClick={() => setActivePolicy('cookie')} className="hover:text-zinc-300 transition-colors focus:text-zinc-300">Cookie Policy</button>
             </div>
             <span>© 2024 Little Giant Society. All rights reserved.</span>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default Website;