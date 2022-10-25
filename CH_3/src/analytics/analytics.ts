// console.log("Sending...");
//noImplicitAny: true --> data is an error, if set to false it disappears
// function sendAnalytics(data) {
//   console.log(data);
// }
// sendAnalytics("The data");

let logged;
function sendAnalytics(data: string) {
  console.log(data);
  logged = true;
}
sendAnalytics("The data");
