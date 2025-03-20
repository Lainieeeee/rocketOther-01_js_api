// API URLは共通のため、ここで定義しておく
// 定義共用的API
const api = "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";



// ==================================================
// 題目一：各學歷人數
// 問題一：各学歴の人数は？
// ==================================================
const educationList = () => {
    async function fetchData() {
        try {
            let response = await fetch(api); // APIを呼び出す
            let jsonData = await response.json(); // JSON 形式のデータに変換する

            // 1. 各學歴の人数を集計
            let educationCount = jsonData.reduce((count, item) => {
                count[item.education] = (count[item.education] || 0) + 1;
                return count;
            }, {}); // 初期値は空のオブジェクト

            // 2. オブジェクト形式として結果を呼び出す
            console.log(educationCount);

        } catch (error) { // エラー発生時の処理
            console.error(error);
        }
    }
    fetchData();
};
educationList();

// ==================================================
// 題目二： 各地區工作人士佔比人數
// 問題二：各地域の勤務者の割合人数は？
// ==================================================
const areaPercentage = () => {
    async function fetchData() {
        try {
            let response = await fetch(api); // APIを呼び出す
            let jsonData = await response.json(); // JSON 形式のデータに変換する

            // 1. エリアの合計数を取得
            const areaTotalCount = jsonData.length;

            // 2. 各エリアの出現回数をカウント
            const areaCount = jsonData.reduce((count, item) => {
                count[item.company.area] = (count[item.company.area] || 0) + 1;
                return count;
            }, {});

            // 3. 各エリアの割合を計算して、配列オブジェクト形式に整形
            // 小数点は切り捨て
            const result = Object.keys(areaCount).map(area => ({
                [area]: `${((areaCount[area] / areaTotalCount) * 100).toFixed(0)}%`
            }));

            // 4. 結果を呼び出す
            console.log(result);
            
        } catch (error) { // エラー発生時の処理
            console.log(error);
        }
    }
    fetchData();
};
areaPercentage();

// ==================================================
// 題目三：26~30 年齡族群的平均薪水滿意度為？
// 問題三：26~30歳の平均給与の満足度は？
// ==================================================
const salarySatisfaction = () => {
    async function fetchData() {
        try {
            let response = await fetch(api); // APIを呼び出す
            let jsonData = await response.json(); // JSON 形式のデータに変換する

            // 1. 26~30歳の人数をフィルタリング
            const ageGroup = jsonData.filter((item) => {
                return item.age === "26~30 歲";
            });

            // 2. 26~30歳の満足度合計を算出
            const totalSalaryScore = ageGroup.reduce((count, item) => {
                return count + parseInt(item.company.salary_score);
            }, 0);

            // 3. 平均を計算
            const averageSalaryScore = totalSalaryScore / ageGroup.length;
            
            // 4. 結果を小数点2桁にフォーマット
            // 少数点1以下の桁数を切り捨てる
            const formattedSalaryScore = averageSalaryScore.toFixed(1);

            // 5. 結果を文字列形式として呼び出す
            // console.log('average: '+formattedSalaryScore);
            // 5. 結果をオブジェクト形式として呼び出す
            console.log({ average: formattedSalaryScore });

        } catch (error) { // エラー発生時の処理
            console.log(error);
        }
    }
    fetchData();
};
salarySatisfaction();

// ==================================================
// 題目四：產業簽到區有寫與沒寫的人數比例為？
// 問題四：産業サインインエリアで記入した人と記入しなかった人の人数比率は？
// ==================================================
const inzustory = () => {
    async function fetchData() {
        try {
            let response = await fetch(api); // APIを呼び出す
            let jsonData = await response.json(); // JSON 形式のデータに変換する

            // 1. 產業簽到區の合計数を取得
            const inzustoryCount = jsonData.length;

            // 2. 產業簽到區が入力されているデータ数をカウント
            const withMessageCount = jsonData.filter((item) => {
                return item.company.industry_message.length > 0;
            }).length;

            // 3. 合計数から入力されているデータを引いて、入力されていないデータ数を算出
            const withoutMessageCount = inzustoryCount - withMessageCount;

            // 4. 結果をオブジェクト配列として一旦整形
            const result = [
                [`有寫${withMessageCount}人`, {
                    no: `沒寫${withoutMessageCount}人`
                }]
            ];

            // 5. 結果を呼び出す
            console.log(result);

            
        } catch (error) { // エラー発生時の処理
            console.log(error);
        }
    };
    fetchData();
};
inzustory();

// ==================================================
// 題目五：各產業的實體與遠端人數
// 問題五：各產業のオフィス勤務とリモート勤務の人数は？
// ==================================================
const industryWorkTypeCount = () => {
    async function fetchData() {
        try {
            let response = await fetch(api); // APIを呼び出す
            let jsonData = await response.json(); // JSON 形式のデータに変換する

            // 1. 業界と職種をカウントする関数
            const companyList = (count, industry, work) => {
                count[industry] = count[industry] || {};  // 業界がすでに存在するか確認し、業界がなければプロパティを新規作成
                count[industry][work] = (count[industry][work] || 0) + 1;  // 業界ごとに職種をカウント
            };

            // 2. 業界と職種のカウントを行う
            const result = jsonData.reduce((count, item) => {
                companyList(count, item.company.industry, item.company.work);
                return count;
            }, {});

            // 3. 結果を呼び出す
            console.log(result);
            
        } catch (error) { // エラー発生時の処理
            console.log(error);
        }
    };
    fetchData();
};
industryWorkTypeCount();

// ==================================================
// 題目六：各產業的男女性比例，與產業滿意度
// 問題六：各產業の男女比とその產業満足度は？
// ==================================================
const calculateIndustryData = () => {
    async function fetchData() {
        try {
            let response = await fetch(api); // APIを呼び出す
            let jsonData = await response.json(); // JSON 形式のデータに変換する

            // 1. 業界ごとのデータを格納するオブジェクトを初期化
            const industryData = {};

            // 2. データをループして、性別ごとに人数と満足度を集計
            const updateIndustryData = (industry, gender, salary) => {
                if (!industryData[industry]) {
                    industryData[industry] = { 男性人数: 0, 女性人数: 0, 男性満足度合計: 0, 女性満足度合計: 0, 男性カウント: 0, 女性カウント: 0 };
                }

                const isMale = gender === "男性";
                const isFemale = gender === "女性";
                
                if (isMale || isFemale) {
                    // 性別に応じたデータをカウントと合計に加算
                    const genderKey = isMale ? '男性' : '女性';
                    industryData[industry][`${genderKey}人数`]++; // 性別ごとの人数をカウント
                    industryData[industry][`${genderKey}満足度合計`] += salary; // 性別ごとの満足度合計を加算
                    industryData[industry][`${genderKey}カウント`]++; // 性別ごとのデータ件数をカウント
                }
            };

            // 3. jsonData配列をループして、各業界・性別・給与スコアを基にデータを更新
            jsonData.forEach(({ company: { industry, salary_score }, gender }) => {
                const salary = isNaN(Number(salary_score)) ? 0 : Number(salary_score);
                updateIndustryData(industry, gender, salary); // アロー関数を使って関数呼び出し
            });

            // 4. 業界ごとに計算結果をまとめ、結果を整形
            const result = Object.keys(industryData).reduce((count, industry) => {
                const { 男性人数, 女性人数, 男性満足度合計, 女性満足度合計, 男性カウント, 女性カウント } = industryData[industry];
                count[industry] = {
                    "男性比例": 男性人数 ? `${((男性人数 / (男性人数 + 女性人数)) * 100).toFixed(0)}%` : "",
                    "女性比例": 女性人数 ? `${((女性人数 / (男性人数 + 女性人数)) * 100).toFixed(0)}%` : "",
                    "男性産業満足度": 男性カウント ? `${(男性満足度合計 / 男性カウント).toFixed(1)}分` : "",
                    "女性産業満足度": 女性カウント ? `${(女性満足度合計 / 女性カウント).toFixed(1)}分` : ""
                };
                return count;
            }, {});

            // 5. 結果を呼び出す
            console.log(result);
            
        } catch (error) { // エラー発生時の処理
            console.log(error);
        }
    };
    fetchData();
};
calculateIndustryData();

// ==================================================
// 題目七：各年資的實體與遠端工作，平均薪水滿意度為？
// 問題七：各年次のオフィス勤務とリモート勤務の平均給与満足度は？
// ==================================================
const avgSatis = () => {
    async function fetchData() {
        try {
            let response = await fetch(api); // APIを呼び出す
            let jsonData = await response.json(); // JSON 形式のデータに変換する

            // 1. データを年資と働き方ごとにグループ化
            const groupedData = jsonData.reduce((count, { company: { job_tenure, work, salary_score } }) => {
                const salary = isNaN(Number(salary_score)) ? 0 : Number(salary_score);
                count[job_tenure] = count[job_tenure] || {};
                count[job_tenure][work] = count[job_tenure][work] || [];
                count[job_tenure][work].push(salary);
                return count;
            }, {});

            // 2. 平均満足度を計算する関数
            const avgSalarySatisfaction = (scores) => (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);

            // 3. 結果を整形
            const result = Object.keys(groupedData).map((jobTenure) => {
                const workResults = Object.keys(groupedData[jobTenure]).reduce((workCount, workType) => {
                    const scores = groupedData[jobTenure][workType];
                    workCount[`${workType}的平均薪水滿意度`] = `${avgSalarySatisfaction(scores)}分`;
                    return workCount;
                }, {});

                return { [`工作經驗${jobTenure}`]: workResults };
            });

            // 4. 結果を表示
            console.log(result);

        } catch (error) { // エラー発生時の処理
            console.log(error);
        }
    };
    fetchData();
};
avgSatis();