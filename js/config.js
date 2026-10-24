(() => {
  const SUPABASE_URL = "https://osajkpbqzmmmeiabnmrk.supabase.co";
  const SUPABASE_KEY = "sb_publishable_XEHHXZN8cASqnT1rcZVv6A_sSm878hW";

  if (!window.supabase || !window.supabase.createClient) {
    console.error(
      "Supabase library is not loaded. Check the CDN script in your HTML."
    );
    return;
  }

  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  console.log("Supabase client ready:", !!window.supabaseClient);
})();
