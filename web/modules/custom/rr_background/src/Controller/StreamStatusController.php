<?php

namespace Drupal\rr_background\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Returns live stream status from the Twitch Helix API.
 *
 * Credentials are read from $settings['rr_twitch_client_id'] and
 * $settings['rr_twitch_client_secret'] in settings.php.
 * Results are cached for 60 seconds to avoid hammering the API.
 */
class StreamStatusController extends ControllerBase {

  public function status(): JsonResponse {
    $cache = \Drupal::cache();
    $cid = 'rr_background:stream_status';

    if ($cached = $cache->get($cid)) {
      return new JsonResponse($cached->data);
    }

    $data = $this->fetchStreamStatus();
    $expire = \Drupal::time()->getRequestTime() + 60;
    $cache->set($cid, $data, $expire);

    return new JsonResponse($data);
  }

  private function fetchStreamStatus(): array {
    $client_id = \Drupal\Core\Site\Settings::get('rr_twitch_client_id');
    $client_secret = \Drupal\Core\Site\Settings::get('rr_twitch_client_secret');

    if (!$client_id || !$client_secret) {
      \Drupal::logger('rr_background')->warning('Twitch credentials not configured in settings.php.');
      return ['live' => FALSE];
    }

    $token = $this->getAccessToken($client_id, $client_secret);
    if (!$token) {
      return ['live' => FALSE];
    }

    try {
      $response = \Drupal::httpClient()->get('https://api.twitch.tv/helix/streams', [
        'query' => ['user_login' => 'rocket_rivals'],
        'headers' => [
          'Client-ID' => $client_id,
          'Authorization' => 'Bearer ' . $token,
        ],
      ]);
      $body = json_decode((string) $response->getBody(), TRUE);
      $stream = $body['data'][0] ?? NULL;
      if ($stream) {
        return ['live' => TRUE];
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('rr_background')->warning('Twitch streams API error: @msg', ['@msg' => $e->getMessage()]);
    }

    return ['live' => FALSE];
  }

  private function getAccessToken(string $client_id, string $client_secret): ?string {
    $cache = \Drupal::cache();
    $cid = 'rr_background:twitch_token';

    if ($cached = $cache->get($cid)) {
      return $cached->data;
    }

    try {
      $response = \Drupal::httpClient()->post('https://id.twitch.tv/oauth2/token', [
        'form_params' => [
          'client_id' => $client_id,
          'client_secret' => $client_secret,
          'grant_type' => 'client_credentials',
        ],
      ]);
      $body = json_decode((string) $response->getBody(), TRUE);
      $token = $body['access_token'];
      $expires_in = $body['expires_in'] ?? 3600;
      $expire = \Drupal::time()->getRequestTime() + $expires_in - 300;
      $cache->set($cid, $token, $expire);
      return $token;
    }
    catch (\Exception $e) {
      \Drupal::logger('rr_background')->warning('Twitch token error: @msg', ['@msg' => $e->getMessage()]);
      return NULL;
    }
  }

}
