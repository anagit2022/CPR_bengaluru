
let begin_screen,gender_screen,intro_screen;
let introaud;
// debug help
let testcount = 0;
let cprD;
let cprR;
let cprD_yes,dcantsafe;
let currentState = "begin";
let genderState = 0;
// check for cprR response
  let response_time = 0;
  let call_time = 0; 
  let check_response;
  let responseState; 
  let responded;
  let wake;
  let mic ; 
  let vol;
  let checkdangeraud,notsafeaud;
  let checkresponseaud;
  let respondedaud;
  let diditwake;
  let cantsafeaud;
  let promisedtaud;
  let promisertaud;
  let promisebtaud;
//call 112 or shout
  let call,callblank,call1,call11,call112,cprCalling,speakeradded;
  let victim,victimaud;
  let callaud,call112aud,addspeakeraud;
let ring,dial;
// AED
let cprA;
// check breathing
let cprB;
let breath_no ;
let normal_breath_aud,gasp_aud;
let breath_time = 0;
let breathtimepass = 0;
let breath_check;
let check_b_type;
let normal_breath;
let checkbreathingaud;
let couldobserveb;
let normal_abnormalbaud;
let ifbreathnormalaud;
//cpr compressions instructions
let cprC1,cprC2,cprC3,cprC4,cprBegin;
let cprC1aud,cprC2aud,cprC3aud,cprC4aud,cprBeginaud;
let cprtime = 0;
let cprtpass = 0;
let compression_count = 0;
let now,interval;
let lastTouchTime = 0;
// play screen
let playimg,heartimg,meterimg,arrowimg;
let cheekOpacity = 40;
let lipOpacity = 120;
let play_start_time,play_elapsed = 0;
// for active blood fill
let goodfillRate = 100;
let badfillRate = 10;
let progress = 0;
//bpm meter
let angle = 0;
let bpm = 0; 
let numberToDisplay;
let decayRate = 10;
let decay_normal = 0.5;
// compressions 
let maxTotalCompressions = 0;
let task_time;
let timeleft;
let good_compression = 0;
let diffGoal = 0;
// win screens
let win,aed,amb,late;
// promise screen
let promiseT,promiseTM,promiseP,promisePM,promiseS,promiseSM,promiseDT,promiseDTM;
let promiseNBT,promiseNBTM,promiseNBP,promiseNBPM;
let promiseRT, promiseRTM, promiseRP, promiseRPM;
let promiseLT, promiseLTM, promiseLP, promiseLPM;
let promise_time = 0;
let promise_start=0;
// track inactivity
let pressed_time = 0 ;
lastTouchElapsed = 0;
// sounds
let promise_sound;
let promisesealedaud;
function preload(){
  begin_screen = loadImage("begin (1).png");
  gender_screen = loadImage("f.png");
  intro_screen = loadImage("intro_screen.png");
  introaud = loadSound("ElevenLabs_2025-06-15T03_03_50_Alice_pre_sp100_s50_sb75_v3.mp3");
  // check for danger if safe or not before cprR(esponse)
  cprD = loadImage("d.png");
  checkdangeraud =loadSound("ElevenLabs_2025-06-15T03_04_45_Alice_pre_sp100_s50_sb75_v3.mp3");
  notsafeaud = loadSound("ElevenLabs_2025-06-15T05_45_53_Alice_pre_sp100_s50_sb75_v3.mp3");
  cantsafeaud = loadSound("ElevenLabs_2025-11-04T08_34_33_Alice_pre_sp100_s50_sb75_v3.mp3");
  promisedtaud = loadSound("ElevenLabs_2025-11-04T07_34_48_Alice_pre_sp100_s50_sb75_v3.mp3");
  cprR = loadImage("r.png");
  checkresponseaud = loadSound("check_for_response.mp3"); 
  cprD_yes = loadImage("Dnot safe.png");
  dcantsafe = loadImage("Dcan't safe (3).png");
  check_response = loadImage("response check.png");
  diditwake = loadSound("did_spongy_respond.mp3");
  responded = loadImage("responded.png");
  wake = loadImage("giffycanvas - 2025-11-03T203702.641.gif");
  respondedaud = loadSound("ElevenLabs_2025-06-I am .mp3");
  promisertaud = loadSound("ElevenLabs_2025-11-04T11_56_30_Alice_pre_sp100_s50_sb75_v3.mp3");
//call 108 or shout
  call = loadImage("call.png");
  callaud = loadSound("ElevenLabs_2025-11-04T11_58_20_Alice_pre_sp100_s50_sb75_v3.mp3");
  call112aud = loadSound("ElevenLabs_2025-11-04T11_58_59_Alice_pre_sp100_s50_sb75_v3.mp3");
  addspeakeraud = loadSound("ElevenLabs_2025-11-04T12_00_41_Alice_pre_sp100_s50_sb75_v3.mp3");
  callblank = loadImage("call blank112.png");
  call1 = loadImage("call 1.png");
  call11 = loadImage("call 11.png");
  call112 = loadImage("call 112.png");
  cprCalling = loadImage("addspeaker (1).png");
  speakeradded = loadImage("speaker added.png");
  victim = loadImage("incardiacarrest.png");
  victimaud = loadSound("ElevenLabs_2025-11-04T17_32_18_Alice_pre_sp100_s50_sb75_v3.mp3");
  ring = loadSound("mixkit-office-telephone-ring-1350.wav");
  dial = loadSound("9aud.mp3");
  // AED
  cprA = loadImage("cprA (1).png");
// check for breathing
  cprB = loadImage("b.png")
  normal_breath_aud = loadSound("breathing-6811.mp3");
  checkbreathingaud = loadSound("check_if_breathing.mp3");
  couldobserveb = loadSound("could_you_see_breathing.mp3");
  normal_abnormalbaud = loadSound("ElevenLabs_2025-06-18T03_04_36_Alice_pre_sp100_s50_sb75_v3.mp3");
  ifbreathnormalaud = loadSound("ElevenLabs_2025-06-17T23_01_53_Alice_pre_sp100_s50_sb75_v3.mp3");
  gasp_aud = loadSound("gasping.m4a");
  breath_check = loadImage("breathing check.png");
  check_b_type = loadImage("btypecheck.png");
  normal_breath = loadImage("normalbreathing.png");
  promisebtaud = loadSound("ElevenLabs_2025-11-04T11_55_06_Alice_pre_sp100_s50_sb75_v3.mp3");
  // cpr compressions instructions
  cprC1 = loadImage("giffycanvas - 2025-10-31T203941.669.gif");
  cprC1aud = loadSound("ElevenLabs_2025-06-28T05_17_33_Alice_pre_sp100_s50_sb75_v3.mp3");
  cprC2aud = loadSound("ElevenLabs_2025-06-25T03_15_33_Alice_pre_sp100_s50_sb75_v3.mp3");
  cprC3aud = loadSound("ElevenLabs_2025-06-16T00_04_57_Alice_pre_sp100_s50_sb75_v3.mp3");
  cprC4aud = loadSound("ElevenLabs_2025-06-25T03_12_37_Alice_pre_sp100_s50_sb75_v3.mp3");
  cprBeginaud = loadSound("ElevenLabs_2025-11-05T03_21_18_Alice_pre_sp100_s50_sb75_v3.mp3");
  cprC2 = loadImage("interlock (3).png");
  cprC3 = loadImage("straight elbows (3).png");
  cprC4 = loadImage("giffycanvas - 2025-10-31T204304.927.gif");
  cprBegin = loadImage("cprBegin.png");
  // play screen
  playimg = loadImage("eyes+ (2).png");
  heartimg = loadImage("heart.png");
  meterimg = loadImage("bpm meter86.png");
  arrowimg = loadImage("arrow2.png");
  press_music = loadSound("mixkit-message-pop-alert-2354.mp3");
  // wincreens
  win = loadImage("revived.gif");
  aed = loadImage("giffycanvas (89).gif");
  amb = loadImage("amb.gif");
  late = loadImage("delayed.png");
  // promise screen
  promiseT = loadImage("giffycanvas - 2025-10-29T083935.786.gif");
  promiseTM = loadImage("giffycanvas - 2025-10-29T161641.860.gif");
  promiseP = loadImage("PromisesealF.png");
  promisePM = loadImage("PromisesealM.png");
  promiseS = loadImage("PromisesealedF.png");
  promiseSM = loadImage("PromisesealedM.png");
  promiseDT = loadImage("giffycanvas - 2025-10-30T194121.823.gif");
  promiseDTM = loadImage("giffycanvas - 2025-10-30T182842.692.gif");
  promiseDP = loadImage("PromisesealDF.png");
  promiseDPM = loadImage("PromisesealDM.png");
  // FOR NORMAL BREATHING PROMISE
  promiseNBT = loadImage("giffycanvas - 2025-10-31T141258.642.gif");
  promiseNBTM = loadImage("giffycanvas - 2025-10-31T141216.810.gif");
  promiseNBP = loadImage("PromisesealNB.png");
  promiseNBPM = loadImage("PromisesealNBM.png");
  // PROMISE FOR RESPONDED
  promiseRT = loadImage("giffycanvas - 2025-11-03T193922.966.gif");
  promiseRTM = loadImage("giffycanvas - 2025-11-03T185651.612.gif");
  promiseRP = loadImage("PromiseRP (1).png");
  promiseRPM = loadImage("PromiseRPM.png");
  // PROMISE FOR DELAYED CPR
  promiseLT = loadImage("giffycanvas - 2025-11-03T231431.622.gif");
  promiseLTM = loadImage("giffycanvas - 2025-11-03T231342.233.gif");
  promiseLP = loadImage("PromiseLP.png");
  promiseLPM = loadImage("PromiseLPM.png");
  // promise sounds 
promise_sound = loadSound("mixkit-happy-bells-notification-937.wav");
promisesealedaud = loadSound("Promise sealed ghar  (1).mp3");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  breath_no = floor(random(11));
  maxTotalCompressions = floor(random(30, 50));
  task_time = 600 * maxTotalCompressions+3000;
  console.log(breath_no);
  mic = new p5.AudioIn();
  mic.start();
  imageMode(CENTER);
  // begin button
  beginx = windowWidth*0.2;
  beginy = windowHeight*0.8;
  beginw = 142;
  beginh = 47;
  // raja button
  rajax = windowWidth*0.2;
  rajay = windowHeight*0.86;
  rajaw = 142;
  rajah = 47;
  // rani button
  ranix = windowWidth*0.5;
  raniy = windowHeight*0.86;
  raniw = 142;
  ranih = 47;
  // next button
  nextx= windowWidth*0.8;
  nexty= windowHeight*0.9;
  nextw= 50;
  nexth=50;
  // sq next button
  sqnextx= windowWidth*0.75;
  sqnexty= windowHeight*0.85;
  sqnextw= 56;
  sqnexth=56;
  // no button
 nox = windowWidth*0.1;
 noy =windowHeight*0.86; 
 now = 142;
 noh= 47;
  // yes button
  yesx =windowWidth*0.5 ;
  yesy = windowHeight*0.86;
  yesw = 142;
  yesh= 47;
  // call 1
  call1x =windowWidth*0.2; 
  call1y = windowHeight*0.4;
  call1w = 60;
  call1h = 60 ;
  // call 0 
  call0x =windowWidth*0.4;  
  call0y = windowHeight*0.7; 
  call0w =60 ;
  call0h =60 ;
  // call 8
  call8x =windowWidth*0.4;  
  call8y = windowHeight*0.6; 
  call8w =60 ;
  call8h =60 ;
  // call 2
  call2x =windowWidth*0.45;  
  call2y = windowHeight*0.43; 
  call2w =60 ;
  call2h =60 ;
  // call ring
  callx =windowWidth*0.4;  
  cally = windowHeight*0.8; 
  callw =60 ;
  callh =60 ;
  // speaker add
  speakerx =windowWidth*0.64;  
  speakery = windowHeight*0.82; 
  speakerw =60 ;
  speakerh =60 ;
  // doneAed
  donex =windowWidth*0.3;  
  doney = windowHeight*0.85; 
  donew =142 ;
  doneh =47 ;
  // normal breathing
  normalx =windowWidth*0.1;  
  normaly = windowHeight*0.86; 
  normalw =142 ;
  normalh =47 ;
  // abnormal breathing
  abnormalx =windowWidth*0.5;  
  abnormaly = windowHeight*0.86; 
  abnormalw =142 ;
  abnormalh =47 ;
  //cpr compression press area
  cpressx = 0.8*windowWidth;
  cpressy = 0.4*windowHeight;
  cpressw = 45;
  cpressh = 111;
  // win screen next button
  lastx = 0.8*windowWidth;
  lasty = 0.02*windowHeight;
  lastw = 55;
 lasth = 55;
  // promise press space
  promisex = 0.6*windowWidth;
  promisey = 0.58*windowHeight;
  promisew = 57;
  promiseh = 90;
  // replay button
  replayx = 0.26*windowWidth;
  replayy = 0.84*windowHeight;
  replayw = 185;
  replayh = 53;
}
function draw(){
  if(currentState=== "begin"){
    background("#F35F3C");
    image(begin_screen,width/2,height/2);
  }else if(currentState === "gender_screen"){
     background("#F35F3C");
    image(gender_screen,width/2,height/2);
  }else if(currentState === "intro"){
     background("#F35F3C");
    image(intro_screen,width/2,height/2);
  }else if(currentState === "cprD"){
    background("#F35F3C");
    image(cprD,width/2,height/2);
    }else if(currentState === "cprR"){
    background("#FFC5B7");
    image(cprR,width/2,height/2);
     vol = mic.getLevel();
     console.log(vol);
    if(vol > 0.15){
    console.log("hello i am okay");
   // okayVoice.play();
      respondedaud.play();
      checkresponseaud.stop();
    responseState = 1;
    console.log(responseState);
  }else
    {
      console.log(" no response");
      responseState = 0;
      console.log(responseState);
    }
    
      if(responseState === 1){
        currentState = "wake";
        //cprR_aud.stop();
        
      }
    // checking time since response check started
     // text(millis()-response_time,50,50);
      if(millis()-response_time > 10000){
      currentState = "cpr_check_response";
      diditwake.play();
      checkresponseaud.stop();
      }
    }else if(currentState === "wake"){
    background("#FFC5B7");
    image(wake,width/2,height/2);
    }else if(currentState === "promiseRT"){
    background("#F35F3C");
    if(genderState === 1){
      image(promiseRTM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseRT,width/2,height/2);
    }
      if(millis() - promise_start >3000){
      currentState = "promiseRP";
    }
    
    }else if(currentState === "promiseRP"){
    background("#F35F3C");
    if(genderState === 1){
      image(promiseRPM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseRP,width/2,height/2);
    }
    }else if(currentState === "cpr_check_response"){
    background("#F35F3C");
    image(check_response ,width/2,height/2);
    }else if(currentState === "cprB"){
    background("#FFC5B7");
    image(cprB,width/2,height/2);
    diditwake.stop();
    breathtimepass = millis() - breath_time;
    if( breathtimepass >10000){
      currentState = "breath_Check";
      couldobserveb.play();
    }
  }else if(currentState === "breath_Check"){
    background("#F35F3C");
    image(breath_check,width/2,height/2);
    }else if(currentState === "check_b_type"){
    background("#F35F3C");
    image(check_b_type,width/2,height/2);
    }else if(currentState === "call"){
    background("#F35F3C");
    image(call,width/2,height/2);
    }else if(currentState === "callblank"){
    background("#F35F3C");
    image(callblank,width/2,height/2);
    }else if(currentState === "call1"){
    background("#F35F3C");
    image(call1,width/2,height/2);
    }else if(currentState === "call11"){
    background("#F35F3C");
    image(call11,width/2,height/2);
    }else if(currentState === "call112"){
    background("#F35F3C");
    image(call112,width/2,height/2);
    }else if(currentState === "cprCalling"){
    background("#F35F3C");
    image(cprCalling,width/2,height/2);
      
       console.log(currentState);
      
    }else if(currentState === "speakeradded"){
    background("#F35F3C");
    image(speakeradded,width/2,height/2);
    if(millis()- call_time > 600){
       currentState ="victim";   
       victimaud.play();
       console.log(currentState);
     }
    }else if(currentState === "victim"){
    background("#F35F3C");
    image(victim,width/2,height/2);
     if(millis()- call_time > 4000){
       currentState ="cprC1";
       victimaud.stop();
       cprC1aud.play();
      cprtime = millis();
      
       console.log(currentState);
     }
    }else if(currentState === "cprC1"){
      cprtpass = millis()-cprtime;
    if(cprtpass > 6000){
      currentState = "cprC2";
      cprC1aud.stop();
      cprC2aud.play();
} 
    background("#F35F3C");
    image(cprC1,width/2,height/2);
    }else if(currentState === "cprC2"){
      cprtpass = millis()-cprtime;
    if(cprtpass > 14000){
      currentState = "cprC3";
      cprC2aud.stop();
      cprC3aud.play();
} 
    background("#F35F3C");
    image(cprC2,width/2,height/2);
    }else if(currentState === "cprC3"){
      cprtpass = millis()-cprtime;
    if(cprtpass > 20000){
      currentState = "cprC4";
      cprC3aud.stop();
      cprC4aud.play();
} 
    background("#F35F3C");
    image(cprC3,width/2,height/2);
    }else if(currentState === "cprC4"){
    background("#F35F3C");
    image(cprC4,width/2,height/2);
       cprtpass = millis()-cprtime;
    if(cprtpass > 30000){
      currentState = "cprBegin";
      cprC4aud.stop();
      cprBegin.play();
} 
    }else if(currentState === "cprBegin"){
    background("#F35F3C");
    image(cprBegin,width/2,height/2);
    }else if(currentState === "play"){
    playScreen();
    }else if(currentState === "win"){
    background("#FFC5B7");
    image(win,width/2,height/2);
    }else if(currentState === "aed"){
    background("#FFC5B7");
    image(aed,width/2,height/2);
    }else if(currentState === "amb"){
    background("#FFC5B7");
    image(amb,width/2,height/2);
    }else if(currentState === "late"){
    background("#FFC5B7");
    image(late,width/2,height/2);
    }else if(currentState === "promiseLT"){
    background("#F35F3C");
    if(genderState === 1){
      image(promiseLTM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseLT,width/2,height/2);
    }
      if(millis() - promise_start >3000){
      currentState = "promiseLP";
    }
    
    }else if(currentState === "promiseLP"){
    background("#F35F3C");
    if(genderState === 1){
      image(promiseLPM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseLP,width/2,height/2);
    }
    }else if(currentState === "promiseT"){
    background("#F35F3C");
    image(promiseT,width/2,height/2);
      promise_time = millis()-promise_start;
      if(promise_time >5000){
        currentState = "Promise_press";
        console.log(currentState);
     }
    }else if(currentState === "Promise_press"){
    background("#F35F3C");
    image(promiseP,width/2,height/2);
    }else if(currentState === "promise_seal"){
    background("#F35F3C");
    if(genderState === 1){
      image(promiseSM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseS,width/2,height/2);
    }
    }else if(currentState === "b_normal"){
    background("#F35F3C");
    image(normal_breath,width/2,height/2);
    }else if(currentState === "promiseNBT"){
    background("#F35F3C");
   if(genderState === 1){
      image(promiseNBTM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseNBT,width/2,height/2);
    }
    if(millis() - promise_start >3000){
      currentState = "promiseNBP";
    }
  }else if(currentState === "promiseNBP"){
    background("#F35F3C");
    if(genderState === 1){
      image(promiseNBPM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseNBP,width/2,height/2);
    }
    }else if(currentState === "cprD_yes"){
    background("#F35F3C");
    image(cprD_yes,width/2,height/2);
    }else if(currentState === "dcantsafe"){
    background("#F35F3C");
    image(dcantsafe,width/2,height/2);
    }else if(currentState === "promiseDT"){
    background("#F35F3C");
    if(genderState === 1){
      image(promiseDTM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseDT,width/2,height/2);
    }
      if(millis() - promise_start >3000){
      currentState = "promiseDP";
    }
    
    }else if(currentState === "promiseDP"){
    background("#F35F3C");
    if(genderState === 1){
      image(promiseDPM,width/2,height/2);
    }else if(genderState === 2){
    image(promiseDP,width/2,height/2);
    }
    }

  // debug helpers
  fill(0);
  text("x : " + mouseX,40,40);
   text(" y : " + mouseY,80,40);
  text("width/2 : " + width ,120,40);
  text(" height/2 : " + height ,200,40);
  text("bno: "+breath_no ,350,40);
   text("s: "+currentState ,200,180);
  text("v: "+vol ,250,140);
  //______________________________________
  
}
function mousePressed(){
  userStartAudio();
  pressed_time = millis();
  if (currentState === "begin") {
    if (
      mouseX > beginx &&
      mouseX < beginx + beginw &&
      mouseY > beginy &&
      mouseY < beginy + beginh
    ) {
      currentState = "gender_screen";
      console.log(currentState);
      }
  }else if(currentState == "gender_screen"){
    if (
      mouseX > rajax &&
      mouseX < rajax + rajaw &&
      mouseY > rajay &&
      mouseY < rajay + rajah
    ) {
      currentState = "intro";
      introaud.play();
      genderState = 1;
      console.log(currentState);
      }else if (
      mouseX > ranix &&
      mouseX < ranix + raniw &&
      mouseY > raniy &&
      mouseY < raniy + ranih
    ) {
      currentState = "intro";
      introaud.play();
      genderState = 2;
      console.log(currentState);
      }
  }else if(currentState == "intro"){
    if (
      mouseX > nextx &&
      mouseX < nextx + nextw &&
      mouseY > nexty &&
      mouseY < nexty + nexth
    ) {
      currentState = "cprD";
      introaud.stop();
      checkdangeraud.play();
      console.log(currentState);
      }
  }else if(currentState == "cprD"){
    if (
      mouseX > yesx &&
      mouseX < yesx + yesw &&
      mouseY > yesy &&
      mouseY < yesy + yesh
    ) {
      currentState = "cprR";
      checkresponseaud.play();
      checkdangeraud.stop();
      response_time = millis();
      console.log(currentState);
      }else if (
      mouseX > nox &&
      mouseX < nox + now &&
      mouseY > noy &&
      mouseY < noy + noh
    ) {
      currentState = "cprD_yes";
      notsafeaud.play();
      checkdangeraud.stop();
      console.log(currentState);
      }
  }else if(currentState == "cprD_yes"){
    if (
      mouseX > yesx &&
      mouseX < yesx + yesw &&
      mouseY > yesy &&
      mouseY < yesy + yesh
    ) {
      currentState = "cprR";
      checkresponseaud.play();
      notsafeaud.stop();
      response_time = millis();
      console.log(currentState);
      }else if (
      mouseX > nox &&
      mouseX < nox + now &&
      mouseY > noy &&
      mouseY < noy + noh
    ) {
      currentState = "dcantsafe";
      cantsafeaud.play();
      notsafeaud.stop();
      console.log(currentState);
      }
  }else if(currentState == "dcantsafe"){
    if (
      mouseX > sqnextx &&
      mouseX < sqnextx + sqnextw &&
      mouseY > sqnexty &&
      mouseY < sqnexty + sqnexth
    ) {
      currentState = "promiseDT";
      cantsafeaud.stop();
      promisedtaud.play();
       promise_start = millis();
      console.log(currentState);
      }
  }else if(currentState == "promiseDP"){
   if (
      mouseX > promisex &&
      mouseX < promisex + promisew &&
      mouseY > promisey &&
      mouseY < promisey + promiseh
    ){
      currentState = "promise_seal";
     promisesealedaud.play();
     promisedtaud.stop();
     promise_sound.play();
      console.log(currentState);
    }
     
  }else if(currentState == "cpr_check_response"){
     if (
      mouseX > nox &&
      mouseX < nox + now &&
      mouseY > noy &&
      mouseY < noy + noh
    ) {
       currentState = "cprB";
       checkbreathingaud.play();
        breath_time = millis();
       if(breath_no % 3 === 0)
       {
         gasp_aud.play();
         testcount= 10;
       }else if (breath_no % 5 === 0){
         normal_breath_aud.play();
         testcount= 20;
       }
       
      console.log(currentState);
     }

      } else if (currentState == "breath_Check"){
    if (
      mouseX > yesx &&
      mouseX < yesx + yesw &&
      mouseY > yesy &&
      mouseY < yesy + yesh
    ) {
      currentState = "check_b_type";
      couldobserveb.stop();
      normal_abnormalbaud.play();
      console.log(currentState);
      } else if (
      mouseX > nox &&
      mouseX < nox + now &&
      mouseY > noy &&
      mouseY < noy + noh
    ) {
      currentState = "call";
      callaud.play();
      normal_abnormalbaud.stop();
      console.log(currentState);
      }
  }else if(currentState == "check_b_type"){
    if (
      mouseX > normalx &&
      mouseX < normalx + normalw &&
      mouseY > normaly &&
      mouseY < normaly + normalh
    ) {
      currentState = "b_normal";
      ifbreathnormalaud.play();
      console.log(currentState);
      }else if (
      mouseX > abnormalx &&
      mouseX < abnormalx + abnormalw &&
      mouseY > abnormaly &&
      mouseY < abnormaly + abnormalh
    ) {
      currentState = "call";
      callaud.play();
      normal_abnormalbaud.stop();
      console.log(currentState);
      }
  }else if(currentState == "b_normal"){
    if (
      mouseX > sqnextx &&
      mouseX < sqnextx + sqnextw &&
      mouseY > sqnexty &&
      mouseY < sqnexty + sqnexth
    ) {
      currentState = "promiseNBT";
      ifbreathnormalaud.stop();
      promisebtaud.play();
       promise_start = millis();
      console.log(currentState);
      }
  }else if(currentState == "promiseNBP"){
   if (
      mouseX > promisex &&
      mouseX < promisex + promisew &&
      mouseY > promisey &&
      mouseY < promisey + promiseh
    ){
      currentState = "promise_seal";
      promisebtaud.stop();
     promise_sound.play();
     promisesealedaud.play();
      console.log(currentState);
    }
     
  }else if(currentState == "call"){
    if (
      mouseX > nextx &&
      mouseX < nextx + nextw &&
      mouseY > nexty &&
      mouseY < nexty + nexth
    ) {
      currentState = "callblank";
      callaud.stop();
      call112aud.play();
      console.log(currentState);
      }
  }else if(currentState == "callblank"){
    if (
      mouseX > call1x &&
      mouseX < call1x + call1w &&
      mouseY > call1y &&
      mouseY < call1y + call1h
    ) {
      currentState = "call1";
      call112aud.stop();
      dial.play();
      console.log(currentState);
      }
  }else if(currentState == "call1"){
    if (
      mouseX > call1x &&
      mouseX < call1x + call1w &&
      mouseY > call1y &&
      mouseY < call1y + call1h
    ) {
      currentState = "call11";
      dial.play();
      console.log(currentState);
      }
  }else if(currentState == "call11"){
    if (
      mouseX > call2x &&
      mouseX < call2x + call2w &&
      mouseY > call2y &&
      mouseY < call2y + call2h
    ) {
      currentState = "call112";
      dial.play();
      console.log(currentState);
      }
  }else if(currentState == "call112"){
    if (
      mouseX > callx &&
      mouseX < callx + callw &&
      mouseY > cally &&
      mouseY < cally + callh
    ) {
      currentState = "cprCalling";
      ring.play();
      addspeakeraud.play();
      console.log(currentState);
      }
  }else if(currentState == "cprCalling"){
    if (
      mouseX > speakerx &&
      mouseX < speakerx + speakerw &&
      mouseY > speakery &&
      mouseY < speakery + speakerh
    ) {
      currentState = "speakeradded";
      console.log(currentState);
      call_time = millis();
      }
  }else if(currentState == "cprC1"){
    if (
      mouseX > nextx &&
      mouseX < nextx + nextw &&
      mouseY > nexty &&
      mouseY < nexty + nexth
    ) {
      currentState = "cprC2";
      console.log(currentState);
      }
  }else if(currentState == "cprC2"){
    if (
      mouseX > nextx &&
      mouseX < nextx + nextw &&
      mouseY > nexty &&
      mouseY < nexty + nexth
    ) {
      currentState = "cprC3";
      console.log(currentState);
      }
  }else if(currentState == "cprC3"){
    if (
      mouseX > nextx &&
      mouseX < nextx + nextw &&
      mouseY > nexty &&
      mouseY < nexty + nexth
    ) {
      currentState = "cprC4";
      console.log(currentState);
      }
  }else if(currentState == "cprC4"){
    if (
      mouseX > nextx &&
      mouseX < nextx + nextw &&
      mouseY > nexty &&
      mouseY < nexty + nexth
    ) {
      currentState = "cprBegin";
      console.log(currentState);
      }
  }else if(currentState == "cprBegin"){
   if (
      mouseX > cpressx &&
      mouseX < cpressx + cpressw &&
      mouseY > cpressy &&
      mouseY < cpressy + cpressh
    ){
      currentState = "play";
     play_start_time = millis();
      console.log(currentState);
    }
     
  }else if(currentState == "play"){
    compression_count += 1;
    console.log(compression_count);
    press_music.play();
    now = millis();
    if (lastTouchTime !== 0) {
      interval = now - lastTouchTime;
      let calculatedBPM = 60000 / interval;
      bpm = calculatedBPM;
      console.log(bpm);
  }
    lastTouchTime = now;
  
  handle_live();
  }else if(currentState == "win"){
   if (
      mouseX > lastx &&
      mouseX < lastx + lastw &&
      mouseY > lasty &&
      mouseY < lasty + lasth
    ){
      currentState = "promiseT";
     promise_start = millis();
      console.log(currentState);
    }
     
  }else if(currentState == "wake"){
   if (
      mouseX > lastx &&
      mouseX < lastx + lastw &&
      mouseY > lasty &&
      mouseY < lasty + lasth
    ){
      currentState = "promiseRT";
     checkresponseaud.stop();
      promisertaud.play();
     promise_start = millis();
      console.log(currentState);
    }
     
  }else if(currentState == "promiseRP"){
   if (
      mouseX > promisex &&
      mouseX < promisex + promisew &&
      mouseY > promisey &&
      mouseY < promisey + promiseh
    ){
      currentState = "promise_seal";
     promise_sound.play();
     promisesealedaud.play();
      promisertaud.stop();
      console.log(currentState);
    }
     
  }else if(currentState == "aed"){
   if (
      mouseX > lastx &&
      mouseX < lastx + lastw &&
      mouseY > lasty &&
      mouseY < lasty + lasth
    ){
      currentState = "promiseT";
     promise_start = millis();
      console.log(currentState);
    }
     
  }else if(currentState == "amb"){
   if (
      mouseX > lastx &&
      mouseX < lastx + lastw &&
      mouseY > lasty &&
      mouseY < lasty + lasth
    ){
      currentState = "promiseT";
     promise_start = millis();
      console.log(currentState);
    }
     
  }else if(currentState == "Promise_press"){
   if (
      mouseX > promisex &&
      mouseX < promisex + promisew &&
      mouseY > promisey &&
      mouseY < promisey + promiseh
    ){
      currentState = "promise_seal";
     promise_sound.play();
     promisesealedaud.play();
      console.log(currentState);
    }
     
  }else if(currentState == "promise_seal"){
   if (
      mouseX > replayx &&
      mouseX < replayx + replayw &&
      mouseY > replayy &&
      mouseY < replayy + replayh
    ){
      currentState = "begin";
     reset();
      console.log(currentState);
    }
     
  }else if(currentState == "late"){
   if (
      mouseX > lastx &&
      mouseX < lastx + lastw &&
      mouseY > lasty &&
      mouseY < lasty + lasth
    ){
      currentState = "promiseLT";
     promise_start = millis();
      console.log(currentState);
    }
     
  }else if(currentState == "promiseLP"){
   if (
      mouseX > promisex &&
      mouseX < promisex + promisew &&
      mouseY > promisey &&
      mouseY < promisey + promiseh
    ){
      currentState = "promise_seal";
     promise_sound.play();
      console.log(currentState);
    }
     
  }
  
}
function playScreen(){
  

  background("#FFC5B7");
  text("x : " + mouseX,40,40);
   text(" y : " + mouseY,80,40);
  text("width/2 : " + width ,120,40);
  text(" height/2 : " + height ,200,40);
  image(playimg, windowWidth/2-40,windowHeight/2);
  image(heartimg,350,47);
  // static rect
  push();
  noStroke();
  fill("#EEEEEE");
  rect(122, 44, 210, 11, 11);
  pop();
  push();
  imageMode(CENTER);
  image(meterimg,78,48);
  pop();
  // show BPM text
  push();
  translate(20, 48);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(23);
  // control the colour of bpm text
  fill(250,50,60);
  text(round(bpm), 0, 0);
  pop();
  
  //show compression count
  push();
  angleMode(RADIANS);
  translate(30,335);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(23);
  fill(0);
  // compression count display
  let numberToDisplay;
  if (compression_count === 0) 
  {
    numberToDisplay = 0;
  }else if (compression_count % 5 === 0) 
  {
    numberToDisplay = compression_count;
  }else {
  numberToDisplay = compression_count % 5;
  }
  text(numberToDisplay + " AND", 0, 0);
  pop();
  // live arrow
  push();
  translate(83,47);
  imageMode(CENTER);
  angleMode(DEGREES);
  rotate(angle);
  image(arrowimg,0,0);
  pop();
  //live rect
  progress -= decay_normal;
  progress = constrain(progress, 6, 210);
  push();
  noStroke();
  fill("#FF5058");
  rect(332, 44, -progress, 11, 11);
  pop();
  
  // controlling cheek and lip colour
  cheekOpacity = map(progress, 6, 210, 40, 255);
  lipOpacity = map(progress, 6, 210, 120, 255);
  // cheek circle1
  push();
  noStroke();
  fill(253, 175, 179, cheekOpacity);
  circle(220, 122, 132);
  pop();
  // cheek circle1
  push();
  noStroke();
  fill(253, 175, 179, cheekOpacity);
  circle(220, 542, 132);
  pop();
// DRAW MOUTH
  push();
  noStroke();
  fill(255, 124, 130, lipOpacity);
  ellipse(310,330,42,120);

  // learning about time passed since play started
 play_elapsed = millis()- play_start_time 
  // goodcompressions count
  diffGoal = maxTotalCompressions - good_compression;
  console.log(diffGoal);
   // display time left 
  push();
  angleMode(RADIANS);
  translate(30,600);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(20);
  fill(0)
  timeleft = task_time - play_elapsed;
  if(timeleft <0 )
    {
      timeleft = 0;
    }
  text(round((timeleft/1000),0)+"s",0,0);
  pop();
  push();
  angleMode(RADIANS);
  translate(52,600);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(18);
  fill(0)
  text("Time left",0,0);
  pop();
  // handle performance 
  handle_performance();
  // handle inactivity
  lastTouchElapsed = ((millis()-pressed_time ));
  handle_inactivity();
}
function handle_inactivity(){
 if( lastTouchElapsed >4000)
   {
     currentState = "late";
     //delayed_aud.play();
     
   }
}
function handle_live()
{
  if(bpm<=120 && bpm>= 100){
    progress += goodfillRate;
    good_compression = good_compression+1;
    angle = 0;
  }else if(bpm>121){
    angle = 60;
    progress +=badfillRate;
  }else if(bpm<100){
    angle = -60;
    progress +=badfillRate;
  }
}
function handle_performance(){
  if(play_elapsed >= task_time)
    {

      if(diffGoal <= 5){
        currentState = "win";
        //win_music.play();
      }else if(diffGoal <= 8){
        currentState = "aed";
        //cprAed_found_aud.play();
      }else if(diffGoal <= 10){
        currentState = "amb";
        //amb_aud.play();
      }else if (diffGoal >= 20){
        currentState = "late";
        //delayed_aud.play();
        
      }
    }
}
function reset(){
  play_start_time = millis();
  good_compression = 0;
  compression_count =0;
  progress = 0;
  angle = 0;
  bpm = 0;
  lastTouchTime = 0;
  interval =0;
  response_time = 0;
  breathe_time = 0;
  cprtime = 0;
  cprtpass = 0;
  call_time = 0;
  breath_no = floor(random(11));
  //cpr2t = 0;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function touchStarted() {
  mousePressed(); // Use the same logic
  return false; // Prevent default browser touch behavior
}

