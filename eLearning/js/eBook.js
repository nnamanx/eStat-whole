// eBook.js
// Multiple Choice Question Answers
    var nChapter  = 35;
    var nQuestion = 35;
    var ans       = new Array(nChapter);
    for (var i = 0; i < nChapter; i++) ans[i] = new Array(nQuestion);
// 1.1 ②, 1.2 ④, 1.3 ③, 1.4 ④, 1.5 ③, 1.6 ④
    ans[1][0] = 6;
    ans[1][1] = 2;
    ans[1][2] = 4;
    ans[1][3] = 3;
    ans[1][4] = 4;
    ans[1][5] = 3;
    ans[1][6] = 4;
// 2.1 ②, 2.2 ③, 2.3 ①, 2.4 ②, 2.5 ④
    ans[2][0] = 5;
    ans[2][1] = 2;
    ans[2][2] = 3;
    ans[2][3] = 1;
    ans[2][4] = 2;
    ans[2][5] = 4;
// 3.1 ④, 3.2 ②, 3.3 ③, 3.4 ④, 3.5 ①
    ans[3][0] = 5;
    ans[3][1] = 4;
    ans[3][2] = 2;
    ans[3][3] = 3;
    ans[3][4] = 4;
    ans[3][5] = 1;
// 4.1 ④, 4.2 ②, 4.3 ④, 4.4 ①, 4.5 ①, 4.6 ②, 4.7 ②, 4.8 ②, 4.9 ②, 4.10 ③
    ans[4][0] = 10;
    ans[4][1] = 4;
    ans[4][2] = 2;
    ans[4][3] = 4;
    ans[4][4] = 1;
    ans[4][5] = 1;
    ans[4][6] = 2;
    ans[4][7] = 2;
    ans[4][8] = 2;
    ans[4][9] = 2;
    ans[4][10] = 3;
// 5.1 ③, 5.2 ②, 5.3 ②, 5.4 ①, 5.5 ④, 5.6 ②, 5.7 ④, 5.8 ②, 5.9 ③, 5.10 ③,
// 5.11 ①, 5.12 ①, 5.13 ④, 5.14 ④, 5.15 ③, 5.16 ④, 5.17 ②, 5.18 ②, 5.19 ④, 5.20 ③,
// 5.21 ④, 5.22 ①, 5.23 ④, 5.24 ④, 5.25 ②, 5.26 ④, 5.27 ④, 5.28 ③, 5.29 ①, 5.30 ④,
// 5.31 ②
    ans[5][0] = 31;
    ans[5][1] = 3;
    ans[5][2] = 2;
    ans[5][3] = 2;
    ans[5][4] = 1;
    ans[5][5] = 4;
    ans[5][6] = 2;
    ans[5][7] = 4;
    ans[5][8] = 2;
    ans[5][9] = 3;
    ans[5][10] = 3;
    ans[5][11] = 1;
    ans[5][12] = 1;
    ans[5][13] = 4;
    ans[5][14] = 4;
    ans[5][15] = 3;
    ans[5][16] = 4;
    ans[5][17] = 2;
    ans[5][18] = 2;
    ans[5][19] = 4;
    ans[5][20] = 3;
    ans[5][21] = 4;
    ans[5][22] = 1;
    ans[5][23] = 4;
    ans[5][24] = 4;
    ans[5][25] = 2;
    ans[5][26] = 4;
    ans[5][27] = 4;
    ans[5][28] = 3;
    ans[5][29] = 1;
    ans[5][30] = 4;
    ans[5][31] = 2;
// 6.1 ③, 6.2 ①, 6.3 ②, 6.4 ③, 6.5 ④, 6.6 ②, 6.7 ①, 6.8 ①, 6.9 ①, 6.10 ①, 
// 6.11 ③, 6.12 ②, 6.13 ④, 6.14 ①, 6.15 ③
    ans[6][0] = 15;
    ans[6][1] = 3;
    ans[6][2] = 1;
    ans[6][3] = 2;
    ans[6][4] = 3;
    ans[6][5] = 4;
    ans[6][6] = 2;
    ans[6][7] = 1;
    ans[6][8] = 1;
    ans[6][9] = 1;
    ans[6][10] = 1;
    ans[6][11] = 3;
    ans[6][12] = 2;
    ans[6][13] = 4;
    ans[6][14] = 1;
    ans[6][15] = 3;
// 7.1 ①, 7.2 ③, 7.3 ②, 7.4 ①, 7.5 ②, 7.6 ④, 7.7 ②, 7.8 ③, 7.9 ④, 7.10 ③,
// 7.11 ④, 7.12 ②
    ans[7][0] = 12;
    ans[7][1] = 1;
    ans[7][2] = 3;
    ans[7][3] = 2;
    ans[7][4] = 1;
    ans[7][5] = 2;
    ans[7][6] = 4;
    ans[7][7] = 2;
    ans[7][8] = 3;
    ans[7][9] = 4;
    ans[7][10] = 3;
    ans[7][11] = 4;
    ans[7][12] = 2;
// 8.1 ④, 8.2 ①, 8.3 ②, 8.4 ④, 8.5 ②, 8.6 ②, 8.7 ④, 8.8 ①, 8.9 ①, 8.10 ②,
    ans[8][0] = 10;
    ans[8][1] = 4;
    ans[8][2] = 1;
    ans[8][3] = 2;
    ans[8][4] = 4;
    ans[8][5] = 2;
    ans[8][6] = 2;
    ans[8][7] = 4;
    ans[8][8] = 1;
    ans[8][9] = 1;
    ans[8][10] = 2;
// 9.1 ③, 9.2 ①, 9.3 ③, 9.4 ②, 9.5 ③, 9.6 ①, 9.7 ①, 9.8 ④, 9.9 ④, 9.10 ①, 9.11 ④, 9.12 ④
    ans[9][0] = 12;
    ans[9][1] = 3;
    ans[9][2] = 1;
    ans[9][3] = 3;
    ans[9][4] = 2;
    ans[9][5] = 3;
    ans[9][6] = 1;
    ans[9][7] = 1;
    ans[9][8] = 4;
    ans[9][9] = 4;
    ans[9][10] = 1;
    ans[9][11] = 4;
    ans[9][12] = 4;
// 10.1 ③, 10.2 ①, 10.3 ①, 10.4 ④, 10.5 ④, 10.6 ②, 10.7 ②,10.8 ③, 10.9 ④, 10.10 ④, 
    ans[10][0] = 10;
    ans[10][1] = 3;
    ans[10][2] = 1;
    ans[10][3] = 1;
    ans[10][4] = 4;
    ans[10][5] = 4;
    ans[10][6] = 2;
    ans[10][7] = 2;
    ans[10][8] = 3;
    ans[10][9] = 4;
    ans[10][10] = 4;
// 11.1 ①, 11.2 ②, 11.3 ②, 11.4 ④, 11.5 ②
    ans[11][0] = 5;
    ans[11][1] = 1;
    ans[11][2] = 2;
    ans[11][3] = 2;
    ans[11][4] = 4;
    ans[11][5] = 2;
// 12.1 ②, 12.2 ①, 12.3 ②, 12.4 ①, 12.5 ①, 12.6 ①, 12.7 ④, 12.8 ①, 12.9 ③, 12.10 ②,
// 12.11 ②, 12.12 ②, 12.13 ②, 12.14 ④, 12.15 ①, 12.16 ①, 12.17 ①, 12.18 ①, 12.19 ③, 12.20 ③), 
// 12.21 ③, 12.22 ②
    ans[12][0] = 22;
    ans[12][1] = 2;
    ans[12][2] = 1;
    ans[12][3] = 2;
    ans[12][4] = 1;
    ans[12][5] = 1;
    ans[12][6] = 1;
    ans[12][7] = 4;
    ans[12][8] = 1;
    ans[12][9] = 3;
    ans[12][10] = 2;
    ans[12][11] = 2;
    ans[12][12] = 2;
    ans[12][13] = 2;
    ans[12][14] = 4;
    ans[12][15] = 1;
    ans[12][16] = 1;
    ans[12][17] = 1;
    ans[12][18] = 1;
    ans[12][19] = 3;
    ans[12][20] = 3;
    ans[12][21] = 3;
    ans[12][22] = 2;
// eStatM
// 1.1 ②, 1.2 ③, 1.3 ④, 1.4 ④, 
    ans[21][0] = 4;
    ans[21][1] = 2;
    ans[21][2] = 3;
    ans[21][3] = 4;
    ans[21][4] = 4;
// 2.1 ②, 2.2 ①, 2.3 ②,
    ans[22][0] = 3;
    ans[22][1] = 2;
    ans[22][2] = 1;
    ans[22][3] = 2;
// 3.1 ②, 3.2 ③, 3.3 ④
    ans[23][0] = 3;
    ans[23][1] = 2;
    ans[23][2] = 3;
    ans[23][3] = 4;
// 4.1 ④, 4.2 ②, 4.3 ②,  4.4  ③ ,4.5 ①
    ans[24][0] = 5;
    ans[24][1] = 4;
    ans[24][2] = 2;
    ans[24][3] = 2;
    ans[24][4] = 3;
    ans[24][5] = 1;
// eStatH
// 1.1 ④,, 1.2 ②, 1.3 ②, 1.4 ③,  1.5 ① 
    ans[31][0] = 5;
    ans[31][1] = 4;
    ans[31][2] = 2;
    ans[31][3] = 2;
    ans[31][4] = 3;
    ans[31][5] = 1;
// 2.1 ③, 2.2 ②,  2.3 ②, 2.4 ①, 2.5 ④, 2.6 ②, 2.7 ④, 2.8 ②, 2.9 ③, 2.10 ③, 2.11 ①
    ans[32][0] = 11;
    ans[32][1] = 3;
    ans[32][2] = 2;
    ans[32][3] = 2;
    ans[32][4] = 1;
    ans[32][5] = 4;
    ans[32][6] = 2;
    ans[32][7] = 4;
    ans[32][8] = 2;
    ans[32][9] = 3;
    ans[32][10] = 3;
    ans[32][11] = 1;
// 3.1 ②,  3.2 ④,  3.3 ③,  3.4 ④,  3.5 ①,  3.6 ④,  3.7 ④,  3.8 ②,  3.9 ①, 3.10 ④, 
// 3.11 ④, 3.12 ③, 3.13 ④, 3.14 ④, 3.15 ④, 3.16 ③, 3.17 ①, 3.18 ④, 
    ans[33][0] = 18;
    ans[33][1] = 2;
    ans[33][2] = 4;
    ans[33][3] = 3;
    ans[33][4] = 4;
    ans[33][5] = 1;
    ans[33][6] = 4;
    ans[33][7] = 4;
    ans[33][8] = 2;
    ans[33][9] = 1;
    ans[33][10] = 4;
    ans[33][11] = 4;
    ans[33][12] = 3;
    ans[33][13] = 4;
    ans[33][14] = 4;
    ans[33][15] = 4;
    ans[33][16] = 3;
    ans[33][17] = 1;
    ans[33][18] = 4;
// 4.1 ③, 4.2 ②, 4.3 ②, 4.4 ①, 4.5 ④, 4.6 ②, 4.7 ④, 4.8 ② 
    ans[34][0] = 8;
    ans[34][1] = 3;
    ans[34][2] = 2;
    ans[34][3] = 2;
    ans[34][4] = 1;
    ans[34][5] = 4;
    ans[34][6] = 2;
    ans[34][7] = 4;
    ans[34][8] = 2;
// Answer text ID
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
// function to evaluate multiple choice question
  function radio(numC,numQ,form) {
    var eval;
    var len = form.item.length;
    var ith = 0;
    var i;
    for (i=0; i<len; i++) {
      if (form.item[i].checked) {
        ith = i+1;
        break;
      }
    }
    document.getElementById(ansID[numQ]).style.font = "bold 14px arial,serif";
    if (ith == 0) {
      if (langNum == 0) eval = "라디오 버튼을 누르세요!!!";
      else eval = "!!! Click Radio Button";
      document.getElementById(ansID[numQ]).value = eval;
    }
    else if (ith == ans[numC][numQ]) {
      if (langNum == 0) eval = "정답에요. 정말 잘했어요! ❤ 😉";
      else eval = "Good! You are right 😉";
      document.getElementById(ansID[numQ]).style.color = "lime";
      document.getElementById(ansID[numQ]).value = eval;
    }
    else {
      if (langNum == 0) eval = "틀렸습니다. 다시 하세요!!! 😢";
      else eval = "Wrong! Try again 😢";
      document.getElementById(ansID[numQ]).style.color = "red";
      document.getElementById(ansID[numQ]).value = eval;
    }
/*
    console.log(ith+" "+len);
    console.log(ansID[numQ])   // "ansQ1"
*/
  }

// eStat link address
    var temp      = "http://www.estat.me/estat/eStat/?json=";
    var nString   = 200;
    var addrStr   = new Array(nString);
    var addrStrB  = new Array(nString);
    addrStr[0]   = "http://www.estat.me/estat/eStat/";
    addrStr[1]   = "http://www.estat.me/estat/eStatH/index.html";
    addrStr[2]   = "http://www.estat.me/estat/eStatU/index.html";
    addrStr[3]   = "http://www.estat.me/estat/ExLecture/index_en.html";
    addrStr[4]   = temp+JSON.stringify({"dataURL":"../Example/eBook/A21Summary_StudentByGender.csv","analysisVar":1,"groupVars":[2,3],"graphNum":1});
    addrStr[5]   = temp+JSON.stringify({"dataURL":"../Example/eBook/A34Raw_Gender.csv","analysisVar":1,"graphNum":1});
    addrStr[6]   = temp+JSON.stringify({"dataURL":"../Example/eBook/Ch3_Ex_Mixed_Survey.csv","graphNum":1});
    addrStr[7]   = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020201_Summary_Gender.csv","analysisVar":1,"groupVars":[2],"graphNum":1});
    addrStr[8]   = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020202_OECD_LifeExpectancy.csv","analysisVar":1,"groupVars":[2],"graphNum":1});
    addrStr[9]   = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020203_Summary_StudentByGender.csv","analysisVar":1,"groupVars":[2,3],"graphNum":1});
    addrStr[10]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020204_Summary_PopulationByGenderKorea.csv","analysisVar":1,"groupVars":[2,3],"graphNum":1});
    addrStr[11]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020205_OECD_ExportImport__2017.csv","analysisVar":1,"groupVars":[2,3],"graphNum":14});
    addrStr[12]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020301_Raw_Gender.csv","analysisVar":1,"graphNum":1});
    addrStr[13]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020302_Raw_MaritalByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":1});
    addrStr[14]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX030201_Continuous_OtterLength.csv","analysisVar":1,"graphNum":15});
    addrStr[15]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX030202_Continous_TeacherAgeByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":15});
    addrStr[16]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX030203_Continuous_CalorieByHotDog.csv","analysisVar":2,"groupVars":[1],"graphNum":15});
    addrStr[17]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX030301_Continuous_HeightWeightByGender.csv","analysisVar":2,"groupVars":[3],"graphNum":20});
    addrStr[18]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040101_Categorical_Gender.csv","analysisVar":1,"groupVars":[3],"graphNum":1});
    addrStr[19]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040102_Continuous_OtterLength.csv","analysisVar":1,"groupVars":[3],"graphNum":19});
    addrStr[20]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040201_Categorical_MaritalByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":1});
    addrStr[21]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040202_Continous_TeacherAgeByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":19});
    addrStr[22]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040301_Continuous_QuizScore.csv","analysisVar":1,"graphNum":15});
    addrStr[23]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040310_Continous_TeacherAgeByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":16});
    addrStr[24]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX070104_Height.csv","analysisVar":1,"graphNum":25});
    addrStr[25]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX080103_WageByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":29});
    addrStr[26]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX080104_TypingSpeedEducation.csv","analysisVar":1,"groupVars":[2],"graphNum":29});
    addrStr[27]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX090101_EnglishScoreByGrade.csv","analysisVar":2,"groupVars":[1],"graphNum":33});
    addrStr[28]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX090201_GasMileage.csv","analysisVar":3,"groupVars":[1],"graphNum":33});
    addrStr[29]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX090301_YieldByRiceFertilizer.csv","analysisVar":3,"groupVars":[2,1],"graphNum":33});
    addrStr[30]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX100101_CookieWeight.csv","analysisVar":1,"graphNum":25});
    addrStr[31]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX100201_ScoreByDept.csv","analysisVar":2,"groupVars":[1],"graphNum":29});
    addrStr[32]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX100202_AgeOfCouple.csv","analysisVar":1,"graphNum":25});
    addrStr[33]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX100301_JobSatisfaction.csv","analysisVar":2,"groupVars":[1],"graphNum":33});
    addrStr[34]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX110102_AgeOfLibraryVisitor.csv","analysisVar":1,"graphNum":19});
    addrStr[35]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX110201_GlassesByGender.csv","analysisVar":1,"groupVars":[2,3],"graphNum":14});
    addrStr[36]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX110202_BeverageByRegion.csv","analysisVar":1,"groupVars":[2,3,4],"graphNum":14});
    addrStr[37]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX120101_SalesByAdvertise.csv","analysisVar":2,"groupVars":[1],"graphNum":20});
    addrStr[38]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX120104_Iris.csv","analysisVar":2,"groupVars":[3,4,5],"graphNum":35});
    addrStr[39]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX120301_TreeVolume.csv","analysisVar":3,"groupVars":[1,2],"graphNum":35});
    addrStr[40]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020201_OECD_AlcoholExpenditure_2013.csv","graphNum":1});
    addrStr[41]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020202_WORLD_ObesityRatio_Age15over__2017.csv","graphNum":1});
    addrStr[42]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020203_Rdatasets_VADeaths.csv","graphNum":1});
    addrStr[43]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020204_OECD_NationalIncome__2017.csv","graphNum":1});
    addrStr[44]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020205_Summary_TemperatureBySeason.csv","graphNum":1});
    addrStr[45]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020301_Raw_MathPreferenceByGender.csv","graphNum":1});
    addrStr[46]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020302_Raw_MathPreferenceByGender.csv","graphNum":1});
    addrStr[47]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030201_Continuous_BikeRoad.csv","graphNum":1});
    addrStr[48]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030202_Rdatasets_Rivers.csv","graphNum":1});
    addrStr[49]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030203_Rdatasets_Precip.csv","graphNum":1});
    addrStr[50]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030204_Continuous_ToothCleanByBrushMethod.csv","graphNum":1});
    addrStr[51]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030205_Rdatasets_PlantGrowth.csv","graphNum":1});
    addrStr[52]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030206_Rdatasets_InsectSprays.csv","graphNum":1});
    addrStr[53]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030301_Rdatasets_faithful.csv","graphNum":1});
    addrStr[54]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030302_Continuous_IncomeAge.csv","graphNum":1});
    addrStr[55]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030303_Rdatasets_Mtcars.csv","graphNum":1});
    addrStr[56]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040101_Categorical_VegetablePrefByGender.csv","graphNum":1});
    addrStr[57]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040102_Continuous_LibraryVisitorAge.csv","graphNum":1});
    addrStr[58]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040201_Categorical_VegetablePrefByGender.csv","graphNum":1});
    addrStr[59]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040202_Continuous_ToothCleanByBrushMethod.csv","graphNum":1});
    addrStr[60]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040301_Continuous_OtterLength.csv","graphNum":1});
    addrStr[61]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040302_Rdatasets_ToothGrowth.csv","graphNum":1});
    addrStr[62]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR070101_Weight.csv","graphNum":1});
    addrStr[63]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR080101_ToothCleanByBrushMethod.csv","graphNum":1});
    addrStr[64]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR080102_CoupleAge.csv","graphNum":1});
    addrStr[65]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR090101_Rdatasets_PlantGrowth.csv","graphNum":1});
    addrStr[66]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR090201_WheatAreaYield.csv","graphNum":1});
    addrStr[67]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR090301_LifeByTemeratureHumidity.csv","graphNum":1});
    addrStr[68]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR100101_CompetencyScore.csv","graphNum":1});
    addrStr[69]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR100201_ScoreByMethod.csv","graphNum":1});
    addrStr[70]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR100202_DifferenceOfMileage.csv","graphNum":1});
    addrStr[71]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR100301_ScoreByMixingMethod.csv","graphNum":1});
    addrStr[72]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR110102_OtterLength.csv","graphNum":1});
    addrStr[73]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR110201_TV_Reading.csv","graphNum":1});
    addrStr[74]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR120101_MidtermFinal.csv","graphNum":1});
    addrStr[75]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR120102_SomkingObesityExercise.csv","graphNum":1});
    addrStr[76]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR120301_SomkingObesityExercise.csv","graphNum":1});
    addrStr[77]  = "http://www.estat.me/estat/eStatU/10DescriptiveStatistics.htm";
    addrStr[78]  = "http://www.estat.me/estat/eStatU/11RandomNumber.htm";
    addrStr[79]  = "http://www.estat.me/estat/eStatU/31CorrelationEng.htm";
    addrStr[80]  = "http://www.estat.me/estat/eStatU/32RegressionEng.htm";
    addrStr[81]  = "http://www.estat.me/estat/eStatU/41BinomialEng.htm";
    addrStr[82]  = "http://www.estat.me/estat/eStatU/42BinomialEng.htm";
    addrStr[83]  = "http://www.estat.me/estat/eStatU/44PoissonEng.htm";
    addrStr[84]  = "http://www.estat.me/estat/eStatU/45GeometricEng.htm";
    addrStr[85]  = "http://www.estat.me/estat/eStatU/46HyperGeoEng.htm";
    addrStr[86]  = "http://www.estat.me/estat/eStatU/50ExponentialEng.htm";
    addrStr[87]  = "http://www.estat.me/estat/eStatU/51NormalEng.htm";
    addrStr[88]  = "http://www.estat.me/estat/eStatU/52NormalEng.htm";
    addrStr[89]  = "http://www.estat.me/estat/eStatU/54TdistEng.htm";
    addrStr[90]  = "http://www.estat.me/estat/eStatU/56ChisqEng.htm";
    addrStr[91]  = "http://www.estat.me/estat/eStatU/58FdistEng.htm";
    addrStr[92]  = "http://www.estat.me/estat/eStatU/61SampleEng.htm";
    addrStr[93]  = "http://www.estat.me/estat/eStatU/62SampleEng.htm";
    addrStr[94]  = "http://www.estat.me/estat/eStatU/63SampleEng.htm";
    addrStr[95]  = "http://www.estat.me/estat/eStatU/64SampleEng.htm";
    addrStr[96]  = "http://www.estat.me/estat/eStatU/65ConfidenceIntervalMu.htm";
    addrStr[97]  = "http://www.estat.me/estat/eStatU/65ConfidenceIntervalMuN.htm";
    addrStr[98]  = "http://www.estat.me/estat/eStatU/66ConfidenceIntervalSigma.htm";
    addrStr[99]  = "http://www.estat.me/estat/eStatU/67ConfidenceIntervalP.htm";
    addrStr[100] = "http://www.estat.me/estat/eStatU/67ConfidenceIntervalPN.htm";
    addrStr[101] = "http://www.estat.me/estat/eStatU/70TestingMu.htm";
    addrStr[102] = "http://www.estat.me/estat/eStatU/72TestingSigma.htm";
    addrStr[103] = "http://www.estat.me/estat/eStatU/74TestingP.htm";
    addrStr[104] = "http://www.estat.me/estat/eStatU/75TestingMuAlpha.htm";
    addrStr[105] = "http://www.estat.me/estat/eStatU/76TestingMuAlphaBeta.htm";
    addrStr[106] = "http://www.estat.me/estat/eStatU/80TestingMu12.htm";
    addrStr[107] = "http://www.estat.me/estat/eStatU/82TestingSigma12.htm";
    addrStr[108] = "http://www.estat.me/estat/eStatU/84TestingP12.htm";
    addrStr[109] = "http://www.estat.me/estat/eStatU/90TestingANOVA.htm";
    addrStr[110] = "http://www.estat.me/estat/eStatU/91TestingFit.htm";
    addrStr[111] = "http://www.estat.me/estat/eStatU/92TestingIndependence.htm";
    addrStr[112] = "http://www.estat.me/estat/eStatU/94SignTest.htm";
    addrStr[113] = "http://www.estat.me/estat/eStatU/950SignedRankDist.htm";
    addrStr[114] = "http://www.estat.me/estat/eStatU/95SignedRank.htm";
    addrStr[115] = "http://www.estat.me/estat/eStatU/960RankSumDist.htm";
    addrStr[116] = "http://www.estat.me/estat/eStatU/96RankSum.htm";
    addrStr[117] = "http://www.estat.me/estat/eStatU/980KruskalDist.htm";
    addrStr[118] = "http://www.estat.me/estat/eStatU/98Kruskal.htm";
    addrStr[119] = "http://www.estat.me/estat/eStatU/990FriedmanDist.htm";
    addrStr[120] = "http://www.estat.me/estat/eStatU/995StudentRangeDist.htm";
    addrStr[121] = "http://www.estat.me/estat/eStatU/99Friedman.htm";
    addrStr[122]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX070104_Height.csv","analysisVar":1,"graphNum":27});
    addrStr[123]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX080103_WageByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":31});
    addrStr[124]  = "http://www.estat.me/estat/eStatU/05WordCloud.htm";
    // eStatM
    addrStr[141] = "http://www.estat.me/estat/eStatH/01BarChart.htm";
    addrStr[142] = "http://www.estat.me/estat/eStatH/05WordCloud.htm";
    addrStr[143] = "http://www.estat.me/estat/eStatH/07StemLeafPlot.htm";
    addrStr[144] = "http://www.estat.me/estat/eStatH/08Histogram.htm";
    addrStr[145] = "http://www.estat.me/estat/eStatH/09RelativeFrequency.htm";
    addrStr[146] = "http://www.estat.me/estat/eStatH/10DotGraph.htm";
    addrStr[147] = "http://www.estat.me/estat/eStatH/40Permutation.htm";
    addrStr[148] = "http://www.estat.me/estat/eStatH/41BinomialEng.htm";
    addrStr[149] = "http://www.estat.me/estat/eStatH/42BinomialEng.htm";
    addrStr[150] = "http://www.estat.me/estat/eStatH/51NormalEng.htm";
    addrStr[151] = "http://www.estat.me/estat/eStatH/52NormalEng.htm";
    addrStr[152] = "http://www.estat.me/estat/eStatH/61SampleEng.htm";
    addrStr[153] = "http://www.estat.me/estat/eStatH/62SampleEng.htm";
    addrStr[154] = "http://www.estat.me/estat/eStatH/63SampleEng.htm";
    addrStr[155] = "http://www.estat.me/estat/eStatH/64SampleEng.htm";
    addrStr[156] = "http://www.estat.me/estat/eStatH/65ConfidenceIntervalMu_H.htm";
    addrStr[157] = "http://www.estat.me/estat/eStatH/30ScatterPlotH.htm";
    addrStr[158] = "http://www.estat.me/estat/eStatH/31CorrelationEng.htm";
    addrStr[159] = "http://www.estat.me/estat/eStatH/32RegressionEng.htm";
    addrStr[160] = "http://www.estat.me/estat/eStatH/11RandomNumber.htm";
    addrStr[161] = "http://www.estat.me/estat/eStatH/40AdditionRule.htm";
    addrStr[162] = "http://www.estat.me/estat/eStatH/40Complementary.htm";
    addrStr[163] = "http://www.estat.me/estat/eStatH/40DiscreteDistribution.htm";
    addrStr[164] = "http://www.estat.me/estat/eStatH/40MultiplicationRule.htm";
    addrStr[165] = "http://www.estat.me/estat/eStatH/40Pascal.htm";
    addrStr[166] = "http://www.estat.me/estat/eStatH/43LawOfLarge.htm";
    addrStr[167] = "http://www.estat.me/estat/eStatH/50NormalComparison.htm";
// eLearning
    addrStr[170] = "http://www.estat.me/estat/eLearning/kr/eStat_kr_Introduction.html";
    addrStr[171] = "http://www.estat.me/estat/eLearning/kr/index.html";

// eBook link address
    temp          = "..";
    addrStrB[0]   = "../index.html";
    addrStrB[1]   = "";
    addrStrB[2]   = "";
    addrStrB[3]   = "";
    addrStrB[4]   = "";
    addrStrB[5]   = "";
    addrStrB[6]   = "";
    addrStrB[7]   = "";
    addrStrB[8]   = "";
    addrStrB[9]   = "";
    addrStrB[10]  = temp+"/chapter01/index.html";
    addrStrB[11]  = temp+"/chapter01/0101.html";
    addrStrB[12]  = temp+"/chapter01/0102.html";
    addrStrB[13]  = temp+"/chapter01/0103.html";
    addrStrB[14]  = temp+"/chapter01/0104.html";
    addrStrB[15]  = temp+"/chapter01/0105.html";
    addrStrB[16]  = "";
    addrStrB[17]  = "";
    addrStrB[18]  = "";
    addrStrB[19]  = "";
    addrStrB[20]  = temp+"/chapter02/index.html";
    addrStrB[21]  = temp+"/chapter02/0201.html";
    addrStrB[22]  = temp+"/chapter02/0202.html"; // +020201
    addrStrB[23]  = temp+"/chapter02/020202.html";
    addrStrB[24]  = temp+"/chapter02/0203.html";  // +020301
    addrStrB[25]  = temp+"/chapter02/020302.html";
    addrStrB[26]  = temp+"/chapter02/0204.html";
    addrStrB[27]  = temp+"/chapter02/0205.html";
    addrStrB[28]  = "";
    addrStrB[29]  = "";
    addrStrB[30]  = temp+"/chapter03/index.html";
    addrStrB[31]  = temp+"/chapter03/0301.html";
    addrStrB[32]  = temp+"/chapter03/0302.html";  // +030201
    addrStrB[33]  = temp+"/chapter03/030202.html";
    addrStrB[34]  = temp+"/chapter03/0303.html";
    addrStrB[35]  = temp+"/chapter03/0304.html";
    addrStrB[36]  = "";
    addrStrB[37]  = "";
    addrStrB[38]  = "";
    addrStrB[39]  = "";
    addrStrB[40]  = temp+"/chapter04/index.html";
    addrStrB[41]  = temp+"/chapter04/0401.html"; // +040101
    addrStrB[42]  = temp+"/chapter04/040102.html";
    addrStrB[43]  = temp+"/chapter04/0402.html"; // +040201
    addrStrB[44]  = temp+"/chapter04/040202.html";
    addrStrB[45]  = temp+"/chapter04/040301.html"; // +040301
    addrStrB[46]  = temp+"/chapter04/040302.html";
    addrStrB[47]  = temp+"/chapter04/0404.html";
    addrStrB[48]  = "";
    addrStrB[49]  = "";
    addrStrB[50]  = temp+"/chapter05/index.html";
    addrStrB[51]  = temp+"/chapter05/0501.html";
    addrStrB[52]  = temp+"/chapter05/0502.html";
    addrStrB[53]  = temp+"/chapter05/0503.html";
    addrStrB[54]  = temp+"/chapter05/050301.html";
    addrStrB[55]  = temp+"/chapter05/050302.html";
    addrStrB[56]  = temp+"/chapter05/050303.html";
    addrStrB[57]  = temp+"/chapter05/050304.html";
    addrStrB[58]  = temp+"/chapter05/0504.html";
    addrStrB[59]  = temp+"/chapter05/050401.html";
    addrStrB[60]  = temp+"/chapter05/050402.html";
    addrStrB[61]  = temp+"/chapter05/0505.html";
    // Chapter 6
    addrStrB[62]  = temp+"/chapter06/index.html";
    addrStrB[63]  = temp+"/chapter06/0601.html";
    addrStrB[64]  = temp+"/chapter06/060201.html"; // +060201
    addrStrB[65]  = temp+"/chapter06/060202.html";
    addrStrB[66]  = temp+"/chapter06/060301.html"; // +060301
    addrStrB[67]  = temp+"/chapter06/060302.html";
    addrStrB[68]  = temp+"/chapter06/060401.html"; // +060401
    addrStrB[69]  = temp+"/chapter06/060402.html";
    addrStrB[70]  = temp+"/chapter06/0605.html"; // +060501
    addrStrB[71]  = temp+"/chapter06/060502.html";
    addrStrB[72]  = temp+"/chapter06/0606.html";
    // Chapter 7
    addrStrB[73]  = temp+"/chapter07/index.html";
    addrStrB[74]  = temp+"/chapter07/0701.html";
    addrStrB[75]  = temp+"/chapter07/0702.html";
    addrStrB[76]  = temp+"/chapter07/0703.html";
    addrStrB[77]  = temp+"/chapter07/0704.html"; // +070401
    addrStrB[78]  = temp+"/chapter07/070402.html";
    addrStrB[79]  = temp+"/chapter07/0705.html";
    // Chapter 8
    addrStrB[80]  = temp+"/chapter08/index.html";
    addrStrB[81]  = temp+"/chapter08/080101.html"; // +080101
    addrStrB[82]  = temp+"/chapter08/080102.html";
    addrStrB[83]  = temp+"/chapter08/0802.html";
    addrStrB[84]  = temp+"/chapter08/0803.html";
    addrStrB[85]  = temp+"/chapter08/0804.html";
    addrStrB[86]  = "";
    addrStrB[87]  = "";
    addrStrB[88]  = "";
    addrStrB[89]  = "";
    addrStrB[90]  = temp+"/chapter09/index.html";
    addrStrB[91]  = temp+"/chapter09/0901.html";
    addrStrB[92]  = temp+"/chapter09/090101.html";
    addrStrB[93]  = temp+"/chapter09/090102.html";
    addrStrB[94]  = temp+"/chapter09/0902.html"; // +090201
    addrStrB[95]  = temp+"/chapter09/090202.html";
    addrStrB[96]  = temp+"/chapter09/0903.html";;
    addrStrB[97]  = temp+"/chapter09/0904.html";
    addrStrB[98]  = "";
    addrStrB[99]  = "";
    addrStrB[100] = temp+"/chapter10/index.html";
    addrStrB[101] = temp+"/chapter10/1001.html"; // +100101
    addrStrB[102] = temp+"/chapter10/100102.html";
    addrStrB[103] = temp+"/chapter10/1002.html"; // +100201
    addrStrB[104] = temp+"/chapter10/100202.html";
    addrStrB[105] = temp+"/chapter10/1003.html"; // +100301
    addrStrB[106] = temp+"/chapter10/100302.html";
    addrStrB[107] = temp+"/chapter10/1004.html";
    addrStrB[108] = "";
    addrStrB[109] = "";
    addrStrB[110] = temp+"/chapter11/index.html";
    addrStrB[111] = temp+"/chapter11/1101.html"; // +110101
    addrStrB[112] = temp+"/chapter11/110102.html";
    addrStrB[113] = temp+"/chapter11/1102.html"; // +110201
    addrStrB[114] = temp+"/chapter11/110202.html";
    addrStrB[115] = temp+"/chapter11/1103.html";
    addrStrB[116] = "";
    addrStrB[117] = "";
    addrStrB[118] = "";
    addrStrB[119] = "";
    addrStrB[120] = temp+"/chapter12/index.html";
    addrStrB[121] = temp+"/chapter12/1201.html";
    addrStrB[122] = temp+"/chapter12/1202.html"; //+120201
    addrStrB[123] = temp+"/chapter12/120202.html";
    addrStrB[124] = temp+"/chapter12/120203.html";
    addrStrB[125] = temp+"/chapter12/120204.html";
    addrStrB[126] = temp+"/chapter12/120205.html";
    addrStrB[127] = temp+"/chapter12/120206.html";
    addrStrB[128] = temp+"/chapter12/1203.html"; //+120301
    addrStrB[129] = temp+"/chapter12/120302.html";
    addrStrB[130] = temp+"/chapter12/120303.html";
    addrStrB[131] = temp+"/chapter12/120304.html";
    addrStrB[132] = temp+"/chapter12/1204.html";

    // eBookM
    addrStrB[140] = "../index.html";
    addrStrB[141] = temp+"/eStatM/chapter01.html";
    addrStrB[142] = temp+"/eStatM/chapter02.html";
    addrStrB[143] = temp+"/eStatM/chapter03.html";
    addrStrB[144] = temp+"/eStatM/chapter04.html";
    
    // eBookH
    addrStrB[150] = "../indexH.html";
    addrStrB[151] = temp+"/eStatH/chapter01.html";
    addrStrB[152] = temp+"/eStatH/chapter02.html";
    addrStrB[153] = temp+"/eStatH/chapter03.html";
    addrStrB[154] = temp+"/eStatH/chapter04.html";

// Move Section
function moveSection(num) {
  window.open(addrStrB[num],"_self");
}
