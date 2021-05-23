import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { Logger, LogLevel } from "msal";

export const authProvider = new MsalAuthProvider(
    // Configuration
    {
        auth: {
            authority: 'https://login.microsoftonline.com/cc69594d-0c68-4121-8dec-43107e141402/',
            clientId: '68e06c4b-2cf3-4898-9994-497c5b95dc30',
            redirectUri: window.location.origin + '/admin',
            validateAuthority: false
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: true
        },
        system: {
            // Enable logging of MSAL events for easier troubleshooting.
            // This should be disabled in production builds.
            logger: new Logger(
                (logLevel, message, containsPii) => {
                    console.log("[MSAL]", message);
                },
                {
                    level: LogLevel.Info,
                    piiLoggingEnabled: false
                }
            )
        }
    },
    // AuthenticationParameters
    {
        scopes: [
            //'<property (i.e. user.read)>',
            'user.read',
            //'https://<your-tenant-name>.onmicrosoft.com/<your-application-name>/<scope (i.e. demo.read)>'
            'api://68e06c4b-2cf3-4898-9994-497c5b95dc30/demo.read'
        ]
    },
    // IMsalAuthProviderConfig
    {
        loginType: LoginType.Popup,
        tokenRefreshUri: window.location.origin + '/auth.html'
    }
);
