import { FetchOptions, ResolvedFetch } from "ofetch";

declare module '#app' {
    interface NuxtApp {
        $api: typeof $fetch
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $api: typeof $fetch
    }
}

export { }