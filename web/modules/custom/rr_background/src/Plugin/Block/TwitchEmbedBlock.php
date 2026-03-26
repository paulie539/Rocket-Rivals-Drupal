<?php

namespace Drupal\rr_background\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the Rocket Rivals Twitch embed block.
 *
 * Uses the current request host for the required Twitch parent= parameter
 * so the embed works on both local (ddev) and production domains.
 *
 * @Block(
 *   id = "rr_twitch_embed",
 *   admin_label = @Translation("Twitch Embed"),
 *   category = @Translation("Rocket Rivals"),
 * )
 */
class TwitchEmbedBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $host = \Drupal::request()->getHost();

    return [
      '#type' => 'inline_template',
      '#template' => '
        <p><a href="https://www.twitch.tv/rocket_rivals">Rocket Rivals on Twitch</a></p>
        <div class="twitch-embed-wrapper"
             data-twitch-src="https://player.twitch.tv/?channel=Rocket_Rivals&parent={{ host }}">
        </div>
      ',
      '#context' => [
        'host' => $host,
      ],
      // Cache per host so the correct parent= domain is used on each deployment.
      '#cache' => ['max-age' => 3600],
    ];
  }

}
