// Minimal card gallery with lightbox navigation
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/**
 * 【ここを編集】グループごとの表示名を個別に設定します
 * 番号（ファイル名の頭文字）: "表示したい名前"
 */
const groupNames = {
  "1": "1～",
  "2": "100～",
  "3": "200～",
  // 4, 5... と増えたらここに追加するだけ
};

/**
 * データの管理
 * srcのファイル名を '1-1.webp', '2-1.webp' ... という形式で判別します
 */
const items = [
{ src: './images/1-1.webp', title: '',
caption:
`#1
It’s Risuko! 🐿️️
The sunlight filtering through the leaves felt so warm,
my tail got all fluffy… and I fell asleep right there. 🌿✨

#BorrowMyTail #ForestRestSpot`
},

{ src: './images/1-2.webp', title: '',
caption:
`#2
It’s Risuko! 🐿️️
Suzuko seems to be in a hurry.
Risuko is not.
Because the coffee would get cold. ☕❄️

#OneSipBreak #WinterMoments`
},

{ src: './images/1-3.webp', title: '',
caption:
`#3
It’s Risuko! 🐿️️

Risuko looks ahead, Suzuko looks around.
“That way looks fun.”
With that one sentence, today’s path is decided. 🍁

#WalkingIsTheMainStory #DetoursAreJustice`
},

{ src: './images/1-4.webp', title: '',
caption:
`#4
It’s Risuko! 🐿️️
It’s a little scary, but I won’t stop.
It’s a little high, but it’s fun.
So today again, I choose this path. 🌙

#FunFirst #ForestSenseOfBalance`
},

{ src: './images/1-5.webp', title: '',
caption:
`#5
It’s Risuko! 🐿️️
When I played the flute, the tanuki listened with a serious face.
Yeah, feels like I passed today.

#ForestConcert #ForestJudge`
},

{ src: './images/1-6.webp', title: '',
caption:
`#6
It’s Risuko! 🐿️️
Dash dash, sharan♪
One runs, one plays.

#RunningSoundsAndStrings #ForestTeamwork`
},

{ src: './images/1-7.webp', title: '',
caption:
`#7
It’s Suzuko. 🤍
I quietly took a breath and tried playing.
The tanuki’s face didn’t move.

Risuko says “feels like a pass,”
but I’ll keep watching until the end.

#ForestConcert #ForestJudge`
},

{ src: './images/1-8.webp', title: '',
caption:
`#8
Risuko and Suzuko.
And then, the tanuki.

After the sound of the flute,
somehow we ended up sitting side by side.
Maybe this is how friendship starts.

#ForestPassSign #AfterTheMusic`
},

{ src: './images/1-9.webp', title: '',
caption:
`#9
It’s Risuko! 🐿️
Snack time! 🍪✨
For now, everything is still up for grabs!

#FirstComeFirstServed #SweetsAreJustice`
},

{ src: './images/1-10.webp', title: '',
caption:
`#10
It’s Risuko! 🐿️
On cold days,
the correct answer is eating close together. 🍔❄️

#WinterWisdom #WarmMoments`
},

{ src: './images/1-11.webp', title: '',
caption:
`#11
It’s Risuko! 🐿️️
Cheeks all red,
fuu.
The sound comes later.

#DoingMyBestRisuko #FluteDependsOnMood #CozyForest`
},

{ src: './images/1-12.webp', title: '',
caption:
`#12
The river is frozen,
but my feelings aren’t.
Today’s fish
will be prepared properly.

#WinterKindness #ForestLife`
},

{ src: './images/1-13.webp', title: '',
caption:
`#13
It’s Risuko! 🐿️️
The sound of the river feels nice.
Otter, wait for me.
Now is a time to relax.

#SlowTime #FeetInTheWater`
},

{ src: './images/1-14.webp', title: '',
caption:
`#14
It’s Risuko! 🐿️️
Mission complete!
Otter, were you watching?
I did it properly.

#ForestMoment #GentleAchievement`
},

{ src: './images/1-15.webp', title: '',
caption:
`#15
It’s Risuko! 🐿️️
A quiet room,
good tea.
I’m not moving anymore.

#WinterRoom #ChoosingStillness`
},

{ src: './images/1-16.webp', title: '',
caption:
`#16
It’s Risuko! 🐿️️
The room is fully Christmas.
Only the cake
hasn’t arrived yet.

#Countdown #WaitingIsPartOfIt`
},

{ src: './images/1-17.webp', title: '',
caption:
`#17
It’s Risuko! 🐿️️
Drum practice starts!
Tanuki is on tambourine duty ✨🥁

#ForestFriends #InstantBand`
},

{ src: './images/1-18.webp', title: '',
caption:
`#18
It’s Risuko! 🐿️️
While practicing drums,
the tanuki got the most excited 🥁✨

#HypeManager #RoleSwap`
},

{ src: './images/1-19.webp', title: '',
caption:
`#19
It’s Risuko! 🐿️
Merry Cookie Christmas! 🍪
Winter light and the smell of fresh baking.
This is what Christmas feels like 🎄

#MerryChristmas #FreshBakedHappiness`
},

{ src: './images/1-20.webp', title: '',
caption:
`#20
It’s Risuko! 🐿️
A holy night, one big leap.
Going to catch the light of the stars ✨🎄

#HolyNight #SacredForest`
},

{ src: './images/1-21.webp', title: '',
caption:
`#21
It’s Risuko! 🐿️
Santa is in the sky,
I’m in charge of the forest 🎄🌲

#ForestSanta #TailWigglingDelivery`
},

{ src: './images/1-22.webp', title: '',
caption:
`#22
It’s Suzuko.
Risuko went ahead.
Not being found
means it’s going well.

#ForestDelivery #TheArtOfNotBeingSeen`
},

{ src: './images/1-23.webp', title: '',
caption:
`#23
It’s Risuko! 🐿️
Worked too hard on night delivery.
Sleepy. But satisfied.

#AfterNightShift #SleepyButHappy`
},

{ src: './images/1-24.webp', title: '',
caption:
`#24
It’s Risuko! 🐿️
A present from Suzuko.
Christmas arrived properly 🎄

#ForestChristmas #WinterStory`
},

{ src: './images/1-25.webp', title: '',
caption:
`#25
It’s Risuko! 🐿️
Posture matters most.
Second is posture.
Third… luck.

#PostureIsEverything #FishingPhilosophy`
},

{ src: './images/1-26.webp', title: '',
caption:
`#26
It’s Risuko! 🐿️
We watch the surface.
The otter watches the flow.

Probably,
years of experience.

#ForestWisdom #WeightOfTime`
},

{ src: './images/1-27.webp', title: '',
caption:
`#27
It’s Risuko! 🐿️
Same river, same time.
Only the results were different.

#TalentGap #DailyDuo`
},

{ src: './images/1-28.webp', title: '',
caption:
`#28
It’s Risuko! 🐿️
If the giver leans in too much,
the receiver watches carefully.

#ForestRules #CarefulEnthusiasm`
},

{ src: './images/1-29.webp', title: '',
caption:
`#29
It’s Suzuko.

A rabbit…
cute.

So cute that
while I stopped, my footprints were buried in snow.
I won’t chase today.

Cute things are meant to be admired. ❄️🐰

#SuzukoDistance #ArtOfNotChasing`
},

{ src: './images/1-30.webp', title: '',
caption:
`#30
It’s Suzuko.

Same form.
Same height.

At this distance,
there’s no alarm.

So today,
I don’t feel watched.

#SuzukoDistance #BecomingScenery`
},
{ src: './images/1-31.webp', title: '',
caption:
`#31
It’s Risuko and Suzuko! 🐿️
We’re visiting a forest gathering today!

The upright ears say “yeah!” and jump to the next topic.
The floppy ears listen quietly, then smile and say “that’s nice.”
Both are excellent.
Only my head can’t keep up.

#KemomimiEarsProject #ForestGathering`
},

{ src: './images/1-32.webp', title: '',
caption:
`#32
It’s Risuko! 🐿️
We are the legs.
Up above is the supervisor.

#SubcontractPosition #ForestRoles`
},

{ src: './images/1-33.webp', title: '',
caption:
`#33
It’s Risuko! 🐿️
Driving.
Lending my legs.

#ForestVehicle #BusinessAsUsual`
},

{ src: './images/1-34.webp', title: '',
caption:
`#34
It’s Risuko! 🐿️
Chicken: “I can fly.”
Suzuko: “That wasn’t mentioned!”
Me: “This forest is high-level!”

#ForestSeriousMode #PeacefulChaos`
},

{ src: './images/1-35.webp', title: '',
caption:
`#35
It’s Risuko! 🐿️
Snow is quiet.
The chicken stays close.
I keep my distance.

#ForestAtmosphere #PersonalSpace`
},

{ src: './images/1-36.webp', title: '',
caption:
`#36
It’s Risuko! 🐿️
Right behind Suzuko.
Why?
Hehe… secret ✨🌲

#DeerPleaseBeQuiet #ForestWitness`
},

{ src: './images/1-37.webp', title: '',
caption:
`#37
It’s Suzuko.

I’m serious about sweets.
The cat is serious about my tail.
Both are correct.
Sweetness is justice.
But not right now.

#PriorityProblem #WaitAMoment`
},

{ src: './images/1-38.webp', title: '',
caption:
`#38
It’s Risuko! 🐿️

A year-end greeting delivery to the snowy shrine.
The horse is calm, Suzuko is energetic, and I’m the guide.

Thank you for walking through the forest with us this year.
Let’s add more warm detours together next year.

Wishing everyone a happy New Year 🌲❄️

#AIart #SeeYouNextYear`
},

{ src: './images/1-39.webp', title: '',
caption:
`#39
It’s Risuko! 🐿️
Same old jokes in the new year.
Forest and mochi.
Looking forward to 2026 🎍

#NewYearGreetings #ItsRisuko`
},

{ src: './images/1-40.webp', title: '',
caption:
`#40
It’s Suzuko.
Went to the first shrine visit.
While waiting in line, my tail stayed warm.
Here’s to 2026 ⛩️

#NewYearGreetings #Suzuko`
},

{ src: './images/1-41.webp', title: '',
caption:
`#41
It’s Risuko! 🐿️
I drew great fortune.
Smiles, now being distributed.

#CheekPouchSmile #ForestGoodLuck`
},

{ src: './images/1-42.webp', title: '',
caption:
`#42
It’s Risuko! 🐿️
My mouth is stuffed with mandarins.
Suzuko, I really can’t take any more…

#HoardingHabit #InstinctOverReason`
},

{ src: './images/1-43.webp', title: '',
caption:
`#43
It’s Risuko! 🐿️
Distance measured.
Presence read.
Permission denied.

#MoodyType #ButThatIsFine`
},

{ src: './images/1-44.webp', title: '',
caption:
`#44
It’s Risuko! 🐿️
Forest winter gear ranking:
this year’s number one is sheep.
Faster than wearing clothes.

#NaturalHeater #TotallyUnfair`
},

{ src: './images/1-45.webp', title: '',
caption:
`#45
It’s Risuko! 🐿️
Cat pose in front of a cat.
In the forest,
this is probably a challenge.

#SilentPressure #ForestIsStrict`
},

{ src: './images/1-46.webp', title: '',
caption:
`#46
It’s Risuko! 🐿️

The catcher,
the reader,
the supporter.

I’m the last one.
Even if it wobbles, I won’t move.

Fish,
it’s time to give up.

#ForestMasters #OurBattleContinues`
},

{ src: './images/1-47.webp', title: '',
caption:
`#47
Good morning ☀️

It’s Risuko! 🐿️
I must have tried too hard at fishing.
Book open, already dreaming.

In my sleep I mutter,
“Here… bite…”

#HardWorker #ForestMoment`
},

{ src: './images/1-48.webp', title: '',
caption:
`#48
It’s Risuko! 🐿️

Practice while awake.
Performance while asleep.
First prize is in dreams.

#DreamPodium #NightMoment`
},

{ src: './images/1-49.webp', title: '',
caption:
`#49
It’s Risuko! 🐿️
I don’t count apples.
If I do,
they usually decrease.

#ForestCommonThings #SuspiciousSnacking`
},

{ src: './images/1-50.webp', title: '',
caption:
`#50
It’s Risuko! 🐿️
About to feed the rabbit.
Discussing who hands it over.
Suzuko is smiling.
The carrot is still not released.

#SmileStrategy #PressureOfSmiles`
},

{ src: './images/1-51.webp', title: '',
caption:
`#51
It’s Risuko! 🐿️
Food is light.
The goat’s expectations are heavy.
Probably thinks it’ll get some.

#SilentPressure #NeverSaidIdGive`
},

{ src: './images/1-52.webp', title: '',
caption:
`#52
It’s Risuko! 🐿️
Outside is still winter.
Cat is warm on my lap, body cool.
We all agree with this scene.

#SupplyAndDemand #WarmthAgreement`
},

{ src: './images/1-53.webp', title: '',
caption:
`#53
It’s Risuko! 🐿️
“Is it ready yet?”
“Just a bit more!”
This exchange
might be the sweetest part.

#SweetConversation #WinterSnackMeeting`
},

{ src: './images/1-54.webp', title: '',
caption:
`#54
It’s Risuko! 🐿️
Upstairs is a tea party.
Down below,
a romance drama.

#MainStoryAtYourFeet #UnseenNarrative`
},

{ src: './images/1-55.webp', title: '',
caption:
`#55
It’s Risuko! 🐿️
It was so cold,
I thought the cozy spots increased.
…but the goat
wasn’t supposed to be one of them.

#ConfusedGoat #CozyMisunderstanding`
},

{ src: './images/1-56.webp', title: '',
caption:
`#56
It’s Risuko! 🐿️
Freshly caught
isn’t cold.
Warm,
and gently flavored.

#ForestBlessings #WarmRecharge`
},

{ src: './images/1-57.webp', title: '',
caption:
`#57
It’s Risuko! 🐿️
Thought Suzuko was missing during work.

Sleeping in the shed,
hugging a baby goat—
probably couldn’t resist the cuteness.

#HeadHiddenTailOut #MissionPaused`
},

{ src: './images/1-58.webp', title: '',
caption:
`#58
It’s Risuko! 🐿️
Perfect for cold days,
this one cup.

Forest coffee,
right here.

#ChosenCup #ForestCoffeeArrived`
},

{ src: './images/1-59.webp', title: '',
caption:
`#59
It’s Risuko! 🐿️
Grand mountains, flute, deer.
The cast is ready.
Now the epic fantasy waits backstage.

#BeforeTheClimax #FantasyWaitingRoom`
},

{ src: './images/1-60.webp', title: '',
caption:
`#60
It’s Risuko! 🐿️
This view, this height, this flute.
Today’s role: bard.
Adding BGM to the world.

#FantasyInPreparation #StayTuned`
},

{ src: './images/1-61.webp', title: '',
caption:
`#61
It’s Risuko! 🐿️
A tanuki singing is already an incident,
but Suzuko naturally harmonizing.

Seems in this forest,
I’m the only one out of the loop.

#ForestDuo #ForestUnit`
},

{ src: './images/1-62.webp', title: '',
caption:
`#62
It’s Risuko! 🐿️
If there’s something to draw, I draw it.
Even if it’s a tanuki, no hesitation.

#TanukiCanvas #FreedomOfExpression`
},

{ src: './images/1-63.webp', title: '',
caption:
`#63
It’s Risuko! 🐿️
Forest picnics
are not invitation-only.

If you come, you join.
That’s the rule.

#SuddenlyFriends #ForestDailyLife`
},

{ src: './images/1-64.webp', title: '',
caption:
`#64
It’s Risuko! 🐿️

Cooking is judged by body shape, not words.

This mouse
gives Suzuko full marks.

#PerfectScoreBody #SkilledKitchen`
},

{ src: './images/1-65.webp', title: '',
caption:
`#65
It’s Risuko! 🐿️️
Flame Chef Tanuki, opening act. 🔥
I know it’s unreasonable.
I know—but I won’t lower my expectations.

#CampfireCooking #TanukiStruggles`
},

{ src: './images/1-66.webp', title: '',
caption:
`#66
It’s Risuko! 🐿️️
Drop it and you lose.
Win and you get snacks.

#AppleChallenge #AnotherPeacefulDay`
},

{ src: './images/1-67.webp', title: '',
caption:
`#67
It’s Risuko! 🐿️
This guilty pleasure where the fork won’t stop.
When Suzuko starts cooking,
the forest fills with good smells.
Roll it, roll it, make a whirlpool of happiness.

#RisukoEatingJoy #GuiltyPasta`
},

{ src: './images/1-68.webp', title: '',
caption:
`#68
It’s Risuko! 🐿️️

Suzuko’s proud Napolitan, finished.
My belly is full—I can’t move another step.
They said “sleeping after eating turns you into a squirrel,”
but I’m already a squirrel, so I’ll roll around freely.

#RisukoDreamComeTrue #AfterNapolitan`
},

{ src: './images/1-69.webp', title: '',
caption:
`#69
It’s Risuko! 🐿️
Baking failed.
Overbaked.
Didn’t rise.
Flour stayed cutely on my nose.

#NoseMemo #SweetnessOnly`
},

{ src: './images/1-70.webp', title: '',
caption:
`#70
It’s Risuko! 🐿️

We are flutes.
Tanuki is whistling.
The only requirement is a happy face.

#SoundIsEnough #RelaxedTime`
},

{ src: './images/1-71.webp', title: '',
caption:
`#71
Good morning ☀️

It’s Risuko! 🐿️️
The lights, the smells, the voices—
everything is fun.
Enjoying the town together with a fox.

#FestivalMood #CityWalkPair`
},

{ src: './images/1-72.webp', title: '',
caption:
`#72
It’s Risuko! 🐿️
I found the fluffiest VIP seat.
I’m not moving from here today!

#BlissfulMoment #MagicOfFluff`
},




];

const gallery = $("#cardGallery");
const filterContainer = $("#filterButtons");

let currentGroupItems = []; 
let idx = -1;

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

// ファイル名からグループ番号を抽出
function getGroupId(src) {
  const filename = src.split('/').pop();
  return filename.split('-')[0];
}

// ギャラリー描画
function renderGallery(groupId) {
  currentGroupItems = items.filter(it => getGroupId(it.src) === groupId);

  gallery.innerHTML = currentGroupItems.map((it, i)=>`
    <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
      <div class="card__imgwrap">
        <img src="${it.src}" alt="${it.title}" loading="lazy">
      </div>
      <figcaption class="card__meta">
        <h3 class="card__title">${it.title}</h3>
        <p class="card__caption">${it.caption}</p>
      </figcaption>
    </figure>
  `).join("");
}

// 切り替えボタンの生成
function setupFilters() {
  const groupIds = [...new Set(items.map(it => getGroupId(it.src)))].sort((a, b) => a - b);
  
  filterContainer.innerHTML = groupIds.map(id => {
    // groupNamesに定義があればそれを使う、なければデフォルトを表示
    const label = groupNames[id] || `Group ${id}`;
    return `<button class="filter-btn" data-group="${id}">${label}</button>`;
  }).join("");

  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;
    
    $$(".filter-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    
    renderGallery(btn.dataset.group);
  });

  const firstBtn = $(".filter-btn");
  if(firstBtn) firstBtn.click();
}

// ライトボックス関連
function openLB(i){
  idx = (i + currentGroupItems.length) % currentGroupItems.length;
  const it = currentGroupItems[idx];
  lbImg.src = it.src;
  lbImg.alt = it.title || "";
  lbTitle.textContent = it.title || "";
  lbCaption.textContent = it.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  preloadAround(idx);
}

function closeLB(){
  lb.hidden = true;
  document.body.style.overflow = "";
  idx = -1;
}

function move(delta){
  if(idx < 0) return;
  openLB(idx + delta);
}

function preloadAround(i){
  [i-1, i+1].forEach(k=>{
    const j = (k + currentGroupItems.length) % currentGroupItems.length;
    const img = new Image();
    img.src = currentGroupItems[j].src;
  });
}

// イベントリスナー
gallery.addEventListener("click", (e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLB(parseInt(card.dataset.i, 10));
});

btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));

lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  if(e.clientX < rect.left + rect.width/2) move(-1); else move(1);
});

document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

// 実行
setupFilters();
// キャプション内のクリックでは画像切り替えをさせない
lbCaption.addEventListener("click", (e) => {
  e.stopPropagation();
});
