// API URLは共通のため、ここで定義しておく
// 定義共用的API
const api = "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";



// ==================================================
// 題目一：各學歷人數
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
// ==================================================
let salarySatisfaction = () => {
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
// ==================================================

// ==================================================
// 題目五：各產業的實體與遠端人數
// ==================================================

// ==================================================
// 題目六：各產業的男女性比例，與產業滿意度
// ==================================================

// ==================================================
// 題目七：各年資的實體與遠端工作，平均薪水滿意度為？
// ==================================================