# Marketing and money plan

Researched 13 October 2026. Six research passes (platforms, pricing, marketing channels, the Vietnamese food and culture angle, comparable games, the classroom market), then three fact-checking passes that re-opened the platforms' own pages for 51 of the claims. Where a number could not be confirmed it says so.

## The short version

- **Expect little money in year one.** The most likely result is somewhere between losing the $99 Apple fee and making about $1,000. Without a paid Steam edition the realistic figure is around zero.
- **A paid Steam edition is the only route with a four-figure ceiling.** It costs $100 and three to five weeks of part-time work, and its middle case is still only a few hundred dollars.
- **Two things in the game itself should be fixed before any marketing:** paid diamonds can be lost (they are stored where iOS may wipe them and Apple will not restore them), and browser saves on itch.io may vanish in Safari.
- **The AI credit decides which doors are open.** `CREDITS.md` says the writing, art and audio are AI-generated. Much of the cozy-games festival circuit refuses AI-made games. Valve's own Steam fests, itch.io and the App Store only ask for disclosure.
- **Lead with the food, the oven and Bà.** "Economics" and "simulator" do not sell in the first second of a clip or a store tile.

## What to expect in year one

After store fees, before income tax. These are scenarios built from benchmarks, not forecasts.

| Where | Middle case | What it would take to do better |
| --- | --- | --- |
| itch.io and the web (tips only) | $0 to $25 | About 25,000 plays might bring $200 |
| iOS (free, Dream team purchase) | −$99 to +$70 | 2,000+ installs might bring $170 |
| Steam, paid at $4.99 | $150 to $800 from 50 to 250 copies | About 2,000 wishlists at launch might bring $2,000 |
| Lesson pack for teachers | $0 to $200 | A year or two of listings and ratings |

The benchmarks behind this:

- The median itch.io game gets 1,582 views in its whole life, and about 590 browser plays ([How To Market A Game, May 2025](https://howtomarketagame.com/2025/05/12/benchmark-itch-io-traffic/)). Browser games there can only take donations ([itch.io docs](https://itch.io/docs/creators/html5)). One developer reported $23.99 from 22,400 browser plays.
- A typical 2026 Steam release has made roughly $1,000 to $2,000 in total before Valve's cut ([Game World Observer, Sept 2026](https://gameworldobserver.com/2026/09/01/the-median-revenue-of-games-on-steam-has-been-declining-for-12-consecutive-years)). That is a third-party estimate, not Valve data.
- Cozy is crowded: 1,041 cozy-tagged Steam releases in 2026 to late September, against 428 in the same weeks of 2025. Cozy shop-keeping releases went from 9 to 56 ([Steam Page Analyzer](https://www.steampageanalyzer.com/blog/cozy-games-steam-2026-niche-report), a vendor blog).
- Small cozy sims that did earn real money (Minami Lane, Kabuto Park, both $4.99) had a publisher label or an existing audience. They show that $5 is an accepted price, not what to expect.
- Solo bakery tycoons on the US App Store sit at 1 to 3 ratings. Nobody finds an unknown app by search; every install comes from a link you placed.

## Fix these before sending anyone to the game

### 1. Paid diamonds could be lost (iOS): fixed

The three consumable diamond packs are gone. The iOS app now sells one non-consumable purchase, the whole Dream team at $4.99, and asks the App Store on every launch and on **Restore purchase** whether the player owns it. Nothing paid for lives in app storage any more. Diamonds are earned only.

Still to do in App Store Connect: create the product `com.michcakee.vietbakeshop.dreamteam` as Non-Consumable (see `docs/store/STORE_LISTING.md`), and test a purchase and a restore in TestFlight. This could not be tested on a Windows PC.

### 2. Browser saves may vanish on itch.io

itch.io runs the game inside a frame on another domain. Safari limits that kind of storage and clears script-written storage for sites not visited for a week. A 100-day bakery played on an iPhone through itch.io may not survive between sessions.

**Recommended:** test on a real iPhone before promoting the itch.io page, and tell players about save codes (Settings) at the top of the page.

### 3. One honest line about AI, used everywhere

- itch.io asks creators to disclose AI-generated content and shows a public tag; pages that hide it can lose browse listing.
- Steam's content survey requires describing AI-made art, sound and text that players see.
- Closed as the game stands: Wholesome Games ("We stand firmly against AI-generated art"), The Fun, The Dark, and The Cozy 2027 (its form bans generative AI), the AAPI Heritage Jam, Outersloth.

Write one plain sentence and put it in every pitch, for example: "The art, audio and first-draft text were made with AI tools; the Vietnamese was checked by [names]." A creator who finds out afterwards is worse than no video.

### 4. Have the Vietnamese checked by people

The Vietnamese lines were drafted by AI. Ask one or two Vietnamese-speaking friends to read every line Bà says and every food name, and credit them as language reviewers in `CREDITS.md`. Vietnamese and diaspora players are the audience most able to spot a wrong tone mark, and the audience most likely to share the game.

## The Steam decision

This is the one decision that changes the numbers, and it has to be made now rather than after watching itch.io for a month. A new itch.io page will not gather enough traffic in four weeks to tell you anything.

**What it costs:** $100 (returned after $1,000 of revenue), plus three to five weeks part-time:

- an Electron wrapper with Steamworks, saves moved to files with Steam Cloud, achievements
- a text-size pass for Steam Deck
- capsule art, screenshots, a 30 to 45 second trailer
- a demo build (the guided first month)
- tax, bank and identity checks, which can take two to four weeks of waiting

**How to sell it:** a flat $4.99 with a 10 to 15% launch discount ([Valve allows 10 to 40% for 7 to 14 days](https://partner.steamgames.com/doc/marketing/discounts)), the Dream team included, no diamonds for money. Steam does not allow ad-funded games, and in-game purchases there need a server the game does not have.

**The question to answer first:** what does the paid edition have that the free web game does not? Charging for an identical build invites refunds. Options are desktop-only extras (achievements, cloud saves, new scenarios or events), or turning the web build into the demo. A visible "bring your bakery with you" save-code import would give web players a reason to buy.

**Dates that matter:**

| Date | What |
| --- | --- |
| Early November 2026 | Latest sensible day to pay the Steam fee |
| Early to mid December 2026 | Store page public with accurate tags, so Valve can invite it to Shop Keeper Fest |
| 10 January 2027 | Steam Next Fest registration closes |
| 25 January to 1 February 2027 | Steam Shop Keeper Fest ("games about managing a store") |
| 6 February 2027 | Tết |
| 22 February to 1 March 2027 | Steam Next Fest (one per game, needs a demo) |
| Early March 2027 | Launch, before the Spring Sale on 18 March |
| 14 to 21 June 2027 | Next Fest fallback if wishlists are still low in February |
| 15 September 2027 | Mid-Autumn Festival |

Shop Keeper Fest is not an open sign-up: Valve picks games by store tags and emails invitations, and unreleased games sit in a secondary section ([Steamworks themed sales](https://partner.steamgames.com/doc/marketing/upcoming_events/themed_sales)). Treat it as a bonus. Next Fest dates are confirmed on [Valve's page](https://partner.steamgames.com/doc/marketing/upcoming_events/nextfest/feb_2027).

**Honest read:** about 7,000 wishlists is the usual advice for a healthy launch, and that is out of reach in four months with no audience. Plan on 300 to 800 wishlists and 50 to 250 copies. It is still the only route here that can pay more than pocket money.

## iOS

Finish it, because most of the work is done, but expect it may not earn back the $99 fee in year one.

- Enrol in the [Small Business Program](https://developer.apple.com/app-store/small-business-program/) (15% instead of 30%) at least a full month before launch. The lower rate starts 15 days after the end of the month Apple approves it.
- Leave Vietnam unselected: Apple says games need a Vietnamese licence to stay on that store, and Vietnam's Decree 147 bars foreign game providers.
- Apple asks every developer to declare EU trader status. An individual who earns from purchases is likely a trader, and Apple then shows an address, phone number and email on EU product pages. Decide on a P.O. box, or leave the EU out at first.
- For a Tết feature, submit the nomination in App Store Connect at least three weeks before the publish date you enter. Most nominations get no reply; do not move the launch for it.
- Do not buy Apple Ads. The US median was $4.63 per game install in 2025, against a $4.99 purchase few players make.

## Where the first players come from

The documented baseline for a free browser game with basic promotion is 500 to 5,000 plays in total. About five hours a week is enough for this:

1. **Tune the itch.io page (once, about 3 hours).**
   - Tick Mobile Friendly, show screenshots, put three GIFs at the top, attach a 20 to 30 second trailer.
   - First image: the oven tray or a finished bánh mì, not a menu.
   - Suggested donation $3 (the fixed 30 cent fee eats smaller tips).
   - Payouts "Collected by itch.io", tax interview done now. Without a tax ID itch.io withholds 30%.
   - Do not delete and recreate the page; a new account's first project waits a few days to be indexed.
2. **One community post a week, each in a different place,** and stay for the comments: r/WebGames, r/playmygame, r/indiegames, the r/tycoon developer thread. Nobody could open Reddit during this research, so read each sidebar first, including any rule about AI-made games. Expect one post in six to do anything.
3. **Ten personal emails a week to small creators** (5,000 to 100,000 followers) who cover cozy, tycoon or free browser games. Offer a ready-made idea, such as "Can I keep grandma's bakery alive through a recession?", and say it opens in a browser tab. Put the AI line in the first email. Plan on 0 to 3 videos from 60 emails.
4. **Short clips as a small habit.** Open on one visual: a tray turning golden, a bánh mì being built, cà phê sữa đá being poured, a customer saying "Đắt quá…" after a price rise. This matters more once there is something to buy.
5. **One Show HN post,** on the engineering story (0.6 MB, no backend, financial statements that reconcile), with the AI credit stated up front. That audience plays but does not pay.
6. **Tết (6 February 2027).** A devlog and a clip that week; short pitches to three or four outlets outside Vietnam (Virtual SEA, NextShark, Indie Games Plus). No case was found of these outlets covering a game like this, so expect silence.
7. **AAPI in Gaming** (about 800 Discord members; its directory lists itch.io and iOS games). Introduce the game honestly and ask if it fits. They may say no on eligibility or on AI.

## Not worth it now

- **Ads in your own builds.** At realistic play counts they earn single dollars a month and cost the "no ads, no tracking" promise.
- **Paid installs of any kind.**
- **Poki.** Its default deal is five years of web exclusivity, which would take the free web versions down.
- **CrazyGames.** The free tier pays nothing and forbids links to the App Store or to your own pages. The paid tier means video ads.
- **Coolmath Games.** It pays licence fees, but it is a school-age site (against the "not a kids' game" rule) and requires removing every link back to you.
- **Google Play, for now.** New personal accounts need 12 testers opted in for 14 straight days, and Google shows a monetising individual's full address.
- **Selling to players in Vietnam.** Huge reach, about $15 a year per player, and legally closed to a foreign developer. A full Vietnamese translation is not worth paying for yet.
- **Patreon, merchandise, brand sponsorships.** Nothing recurring to offer and no audience to offer it to.
- **The classroom market as income.** Schools get this category free or buy from incumbents by purchase order. A paid lesson pack would be about nine days of work for under $200 in six months. A free one-page teacher note on a separate page is the cheap version, later.
- **Paid showcases.** The MIX charged $600 for Fall 2026.

## What to watch in the first month

The game has no analytics, so the store dashboards are the only data.

- **itch.io:** views, plays, and the best single day. Under 1,600 views with no day above 200 means the pitch is not landing; change the first image and the first line before spending more.
- **Plays as a share of views:** below 40% means the page or the first screen is losing people.
- **Steam, if the page goes up:** wishlists per week. 0 to 40 is the bottom tier.
- **iOS:** installs in the first 30 days, and the share who buy.

## Still unconfirmed

- Reddit rules, creator names and sizes, and every 2027 festival date other than Valve's.
- The Shop Keeper Fest registration deadline (Valve's page for it returned an error).
- What Google Play charges a small US developer since its June 2026 fee change.
- Whether itch.io lets a priced extra file sit on a browser-game page.
- Your country. Tax forms, withholding and store payout rules differ outside the US. Nothing here is tax or legal advice.
