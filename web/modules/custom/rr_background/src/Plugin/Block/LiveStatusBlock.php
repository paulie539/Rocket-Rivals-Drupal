<?php

namespace Drupal\rr_background\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Displays a live Twitch stream indicator, updated by JavaScript polling.
 *
 * @Block(
 *   id = "rr_live_status",
 *   admin_label = @Translation("Twitch Live Status"),
 *   category = @Translation("Rocket Rivals"),
 * )
 */
class LiveStatusBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#markup' => '<div id="rr-live-status" aria-live="polite" aria-atomic="true"></div>',
      '#attached' => ['library' => ['rr_background/live_status']],
      // No server-side cache — the JS handles dynamic updates.
      '#cache' => ['max-age' => 0],
    ];
  }

}
