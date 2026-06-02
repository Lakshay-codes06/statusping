import { supabase } from "./lib/supabase/client";

async function test() {
  const { data, error } = await supabase
    .from("monitors")
    .select("*");

  console.log(data);
  console.log(error);
}

test();