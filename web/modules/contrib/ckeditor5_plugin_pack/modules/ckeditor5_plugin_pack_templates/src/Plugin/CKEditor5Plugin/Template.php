<?php

/*
 * Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

declare(strict_types=1);

namespace Drupal\ckeditor5_plugin_pack_templates\Plugin\CKEditor5Plugin;

use Drupal\ckeditor5\Plugin\CKEditor5PluginConfigurableTrait;
use Drupal\ckeditor5\Plugin\CKEditor5PluginDefault;
use Drupal\ckeditor5\Plugin\CKEditor5PluginInterface;
use Drupal\ckeditor5_plugin_pack\Utility\LibraryVersionChecker;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\editor\EditorInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * CKEditor 5 Productivity Pack Content Templates Plugin.
 *
 * @internal
 *   Plugin classes are internal.
 */
class Template extends CKEditor5PluginDefault implements CKEditor5PluginInterface, ContainerFactoryPluginInterface {

  use CKEditor5PluginConfigurableTrait;

  /**
   * The id of the plugin in productivity pack.
   */
  const PRODUCTIVITY_PACK_PLUGIN_ID = 'template';

  /**
   * Creates the plugin instance.
   *
   * @param \Drupal\ckeditor5_plugin_pack\Utility\LibraryVersionChecker $libraryVersionChecker
   *   The CKEditor 5 library version checker.
   * @param mixed ...$parent_arguments
   *   The parent plugin arguments.
   */
  public function __construct(
    protected LibraryVersionChecker $libraryVersionChecker,
    ...$parent_arguments) {
    parent::__construct(...$parent_arguments);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $container->get('ckeditor5_plugin_pack.core_library_version_checker'),
      $configuration,
      $plugin_id,
      $plugin_definition);
  }

  /**
   * {@inheritdoc}
   */
  public function getDynamicPluginConfig(array $static_plugin_config, EditorInterface $editor): array {
    $plugin = $this->getFeaturedPluginId();

    $definitions = $this->getAvailableTemplates($editor);
    if ($definitions) {
      $static_plugin_config[$plugin]['definitions'] = $definitions;
    }

    if ($this->libraryVersionChecker->isLibraryVersionHigherOrEqual('44.0.0')) {
      $static_plugin_config['licenseKey'] = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3OTU0Nzg0MDAsImp0aSI6IjFhYTU3Yjg1LTI4MmYtNDA0Yy1iOGJjLWRlZjMxY2JhNTE0MSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOiJkcnVwYWwiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiMWI5MDYxMDcifQ.nti5B6fVADt74CgmHt9UUrgs5AjsbOQZESlFolk9nfms5QuSLtViQS8zLId5i_uVaaqwc4v_dr_0vIa8ukmQtQ';
    }
    else {
      $static_plugin_config['licenseKey'] = 'v+VnVUkoRLt0uNIXgyq4lpkwrMElte1PrLtw9iX++LapiRgH9EGQ+DQmoJJS+xLSiwGqal3CcbuiE/KQlpntGd4APpvX2nm/XjeyZZNcQ3J8zLDbZQnwLfh1Iukvs+MvVR7KKDbXfqA4rSa/e7ad0yw/hJ+Il5Al/kyuqlOHFKJwypNIa6O/2uycZcYMEJ/6ygCZbOb9ueMKhd72jpLn56XOLXmD61Z2Ty3A1buYFzRyRPvrErxX+O7FUm4PyUE=';
    }

    return $static_plugin_config;
  }

  /**
   * Gets the featured plugin id.
   *
   * @return string
   *   The CKEditor plugin name.
   */
  public function getFeaturedPluginId(): string {
    return self::PRODUCTIVITY_PACK_PLUGIN_ID;
  }

  /**
   * Returns array of CKEditor5 templates.
   *
   * @param \Drupal\editor\EditorInterface $editor
   *   Editor.
   *
   * @return array
   *   An Array of CKEditor5 templates definitions for the editor.
   */
  protected function getAvailableTemplates(EditorInterface $editor): array {
    $format = $editor->getFilterFormat()->id();

    $entityStorage = \Drupal::service('entity_type.manager')
      ->getStorage('ckeditor5_template');
    $query = $entityStorage->getQuery();
    $query->accessCheck(TRUE);
    $query->condition('status', TRUE);
    $query->condition('textFormats.*', $format, '=');
    $query->sort('weight');
    $results = $query->execute();

    $templates = $entityStorage->loadMultiple($results);
    $definitions = [];
    foreach ($templates as $template) {
      $definitions[] = $template->getDefinition();
    }

    return $definitions;
  }

}
