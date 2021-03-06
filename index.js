async function main() {
  const webdriverio = require('webdriverio');
  const {Eyes, By, Target, Configuration} = require('@applitools/eyes-webdriverio');
  const {Region} = require('@applitools/eyes-sdk-core');

  const browserOptions = {
    remoteHost: "http://localhost:4444",
    capabilities: {
      browserName: 'chrome',
    }
  };
  const browser = await webdriverio.remote(browserOptions);


  let eyes = new Eyes();
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

  try {
    await eyes.open(browser, 'Strict/layout', 'test', {width: 800, height: 600});

    // await browser.url('https://applitools.com/helloworld');
    await browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');

    await eyes.check('strictRegions', Target.window().strictRegions(By.id("overflowing-div")));

    await eyes.check('layoutRegions', Target.window().layoutRegions(By.id('overflowing-div-image')));

    await eyes.check('contentRegions', Target.window().contentRegions(By.id('overflowing-div-image')));

    await eyes.close(false);

  } catch (e) {
    console.log(e);
  } finally {
    await browser.deleteSession();
    await eyes.abortIfNotClosed();
  }
}

main();
