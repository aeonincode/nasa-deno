/**
 * Deno includes:
 * 
 * 1. The test runner in the CLI.
 * 2. Assertions in the standard library.
 * 3. built-in test fixtures with Deno.test().
 */

import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("short example test", () => {
  assertEquals("deno", "deno");
  assertNotEquals({
    runtime: "deno",
  }, {
    runtime: "node",
  });
});

Deno.test({
  name: "long example test",
  ignore: Deno.build.os === "linux",
  fn() {
    assertEquals("deno", "deno");
    assertNotEquals({
      runtime: "deno",
    }, {
      runtime: "node",
    });
  },
});

Deno.test({
  name: "operation leak",
  sanitizeOps: false,
  fn() {
    setTimeout(console.log, 10000);
  },
});

Deno.test({
  name: "resource leak",

  //sanitizeOps: false,
  async fn() {
    await Deno.open("./models/planets.ts");
  },
});
