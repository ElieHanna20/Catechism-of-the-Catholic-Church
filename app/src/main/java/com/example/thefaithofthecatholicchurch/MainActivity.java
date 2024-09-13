package com.example.thefaithofthecatholicchurch;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.content.Intent;
import android.net.Uri;

import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

    private WebView mywebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize WebView
        mywebView = findViewById(R.id.webview);
        mywebView.setWebViewClient(new CustomWebViewClient());

        // Enable JavaScript
        WebSettings webSettings = mywebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        // Enable debugging to see JavaScript errors in Logcat
        WebView.setWebContentsDebuggingEnabled(true);

        // Allow universal access for file URLs (for loading local assets properly)
        webSettings.setAllowUniversalAccessFromFileURLs(true);

        // Load the main HTML file from the assets folder
        mywebView.loadUrl("file:///android_asset/index.html");
    }

    // Custom WebViewClient to handle resource loading and mailto links
    private class CustomWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (url.startsWith("mailto:")) {
                Intent intent = new Intent(Intent.ACTION_SENDTO, Uri.parse(url));
                view.getContext().startActivity(intent);
                return true; // Indicate that we handled this URL
            }
            view.loadUrl(url);
            return true; // Indicate that we handled this URL
        }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            // Handle requests for assets like CSS and JS
            String url = request.getUrl().toString();
            if (url.contains("/public/")) {
                String assetPath = "public" + request.getUrl().getPath().replaceFirst("/public", "");
                try {
                    InputStream inputStream = getAssets().open(assetPath);
                    String mimeType = getMimeType(assetPath);
                    return new WebResourceResponse(mimeType, "UTF-8", inputStream);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return super.shouldInterceptRequest(view, request);
        }

        // Helper method to return the correct MIME type for assets
        private String getMimeType(String path) {
            if (path.endsWith(".css")) {
                return "text/css";
            } else if (path.endsWith(".js")) {
                return "application/javascript";
            }
            return null;
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
        }
    }

    @Override
    public void onBackPressed() {
        if (mywebView.canGoBack()) {
            mywebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
