async function main() {
  const webdriverio = require('webdriverio');
  const {Eyes, By, Target, Configuration} = require('@applitools/eyes-webdriverio');
  const {Region} = require('@applitools/eyes-sdk-core');

  const browserOptions = {
    remoteHost: "http://localhost:4444",
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--disable-infobars',
          'headless'
        ]
      }
    }
  };
  const browser = await webdriverio.remote(browserOptions);


  let eyes = new Eyes();
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

  try {
    await eyes.open(browser, 'Ignore regions', 'ignore-regions', {width: 800, height: 600});

    // await browser.url('https://applitools.com/helloworld');
    await browser.url('https://cloudinary.com/users/login');

    await eyes.check("Window - ignore by ID", Target.window().ignore(By.id('user_session_email')));

    await eyes.check("Window - ignore by cssSelector", Target.window().ignore(By.css('#user_session_email')));

    await eyes.check("Window - ignoreRegion by ID", Target.window().ignore(By.id('user_session_email')));

    await eyes.check("Window - layoutRegions by ID", Target.window().layoutRegions(By.id('user_session_email')));

    await eyes.check("Window - layoutRegions by xPath", Target.window().layoutRegions(By.xPath('//*[@id="user_session_email"]')));

    await eyes.close(false);

  } catch (e) {
    console.log(e);
  } finally {
    await browser.deleteSession();
    await eyes.abortIfNotClosed();
  }
}

main();
