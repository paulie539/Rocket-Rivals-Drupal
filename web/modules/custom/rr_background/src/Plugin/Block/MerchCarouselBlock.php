<?php

namespace Drupal\rr_background\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides the Rocket Rivals merch carousel block.
 *
 * Slides are stored as config — one per line in the format:
 *   link_url|image_path|alt_text
 *
 * @Block(
 *   id = "rr_merch_carousel",
 *   admin_label = @Translation("Rocket Rivals Merch Carousel"),
 *   category = @Translation("Rocket Rivals"),
 * )
 */
class MerchCarouselBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration(): array {
    return [
      'headline'    => 'Official Rocket Rivals merchandise is here! Thank you for the support!',
      'subheadline' => "We've teamed up with Arma to bring you exclusive branded gear.",
      'slides'      => implode("\n", [
        'https://arma.gg/collections/rocket-rivals/rrmerch1|/sites/default/files/rrmerch1.png|Rocket Rivals x Arma Merch 1',
        'https://arma.gg/collections/rocket-rivals/rrmerch2|/sites/default/files/rrmerch2.png|Rocket Rivals x Arma Merch 2',
        'https://arma.gg/collections/rocket-rivals/rrmerch3|/sites/default/files/rrmerch3.png|Rocket Rivals x Arma Merch 3',
        'https://arma.gg/collections/rocket-rivals/rrmerch4|/sites/default/files/rrmerch4.png|Rocket Rivals x Arma Merch 4',
        'https://arma.gg/collections/rocket-rivals/rrmerch5|/sites/default/files/rrmerch5.png|Rocket Rivals x Arma Merch 5',
        'https://arma.gg/collections/rocket-rivals/rrmerch6|/sites/default/files/rrmerch6.png|Rocket Rivals x Arma Merch 6',
        'https://arma.gg/collections/rocket-rivals/rrmerch7|/sites/default/files/rrmerch7.png|Rocket Rivals x Arma Merch 7',
        'https://arma.gg/collections/rocket-rivals/rrmerch8|/sites/default/files/rrmerch8.png|Rocket Rivals x Arma Merch 8',
      ]),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state): array {
    $config = $this->configuration;

    $form['headline'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Headline'),
      '#default_value' => $config['headline'],
      '#required'      => TRUE,
    ];

    $form['subheadline'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Sub-headline'),
      '#default_value' => $config['subheadline'],
    ];

    $form['slides'] = [
      '#type'          => 'textarea',
      '#title'         => $this->t('Slides'),
      '#default_value' => $config['slides'],
      '#rows'          => 12,
      '#description'   => $this->t('One slide per line: <code>link_url|image_path|alt_text</code><br>Example: <code>https://arma.gg/item|/sites/default/files/img.png|My alt text</code>'),
      '#required'      => TRUE,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state): void {
    $this->configuration['headline']    = $form_state->getValue('headline');
    $this->configuration['subheadline'] = $form_state->getValue('subheadline');
    $this->configuration['slides']      = $form_state->getValue('slides');
  }

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#theme'       => 'rr_merch_carousel',
      '#headline'    => $this->configuration['headline'],
      '#subheadline' => $this->configuration['subheadline'],
      '#slides'      => $this->parseSlides($this->configuration['slides']),
      '#attached'    => ['library' => ['rocket_rivals/merch']],
    ];
  }

  /**
   * Parses the slides textarea into an array of url/src/alt arrays.
   */
  private function parseSlides(string $raw): array {
    $slides = [];
    foreach (explode("\n", $raw) as $line) {
      $line = trim($line);
      if ($line === '') {
        continue;
      }
      $parts = explode('|', $line, 3);
      if (count($parts) < 2) {
        continue;
      }
      $slides[] = [
        'url' => trim($parts[0]),
        'src' => trim($parts[1]),
        'alt' => trim($parts[2] ?? ''),
      ];
    }
    return $slides;
  }

}
