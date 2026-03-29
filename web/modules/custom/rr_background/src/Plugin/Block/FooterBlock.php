<?php

namespace Drupal\rr_background\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the Rocket Rivals site footer with particle-toggle button.
 *
 * @Block(
 *   id = "rr_footer",
 *   admin_label = @Translation("Rocket Rivals Footer"),
 *   category = @Translation("Rocket Rivals"),
 * )
 */
class FooterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#type' => 'inline_template',
      '#template' => '
        <div class="rr-footer__inner">
          <span class="rr-footer__copy">&copy; {{ year }} Rocket Rivals. All rights reserved</span>
          <button id="rr-bg-toggle"
                  class="rr-bg-toggle"
                  aria-pressed="true"
                  title="Toggle background particles">
            <span class="rr-bg-toggle__icon" aria-hidden="true"></span>
            <span class="rr-bg-toggle__label">Toggle background effect</span>
          </button>
        </div>
      ',
      '#context' => [
        'year' => date('Y'),
      ],
      '#attached' => [
        'library' => [
          'rr_background/footer',
          'rocket_rivals/footer',
        ],
      ],
    ];
  }

}
