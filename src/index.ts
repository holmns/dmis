import puppeteer from "puppeteer";
require("dotenv").config();

const URL = "http://dmis.mwit.ac.th/stud/login.jsp";
const goHome = process.argv.includes("-h");
const reasonArgIndex = process.argv.indexOf("-r");
const reason =
  reasonArgIndex !== -1 && process.argv[reasonArgIndex + 1]
    ? process.argv[reasonArgIndex + 1]
    : "กินข้าว";

async function dmis() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--disable-features=HttpsFirstBalancedModeAutoEnable",
      URL,
    ],
  });

  const pages = await browser.pages();

  const page = pages[0];

  page.goto(URL, { timeout: 15000 });

  await Promise.all([
    page.waitForSelector("#cerceve > div.formbody > form > input:nth-child(1)"),
    page.waitForSelector("#cerceve > div.formbody > form > input:nth-child(2)"),
    page.waitForSelector("#cerceve > div.formbody > form > input.submit"),
  ]);

  await page.type(
    "#cerceve > div.formbody > form > input:nth-child(1)",
    process.env.USERNAME ?? ""
  );

  await page.type(
    "#cerceve > div.formbody > form > input:nth-child(2)",
    process.env.PASSWORD ?? ""
  );

  await page.click("#cerceve > div.formbody > form > input.submit");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await page.click("#menuleft > div:nth-child(2) > div.panel-heading > h6 > a");

  if (!goHome) {
    await page.click("#collapse2 > div > ul > li:nth-child(1) > a");
    await page.waitForSelector("#txtSubject");
    await page.type("#txtSubject", reason);
    // await page.click("#flex1 > tbody > tr:nth-child(5) > td:nth-child(1) > input.btn.btn-sm.btn-info"); // Submit
  } else {
    await page.click("#collapse2 > div > ul > li:nth-child(2) > a");
    await page.waitForSelector("#goHomeType");
    await page.click("#goHomeType");
    // await page.click("#btnSave"); // Submit
  }
}

dmis();
