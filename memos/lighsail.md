```
< ~/kis9a !+master > aws --profile=kis9a lightsail get-bundles --region eu-west-1 --query 'bundles[].{price:price,cpuCount:cpuCount,ramSizeInGb:ramSizeInGb,diskSizeInGb:diskSizeInGb,bundleId:bundleId,instanceType:instanceType,supportedPlatforms:supportedPlatforms[0]}' --output table
---------------------------------------------------------------------------------------------------------------
|                                                 GetBundles                                                  |
+-----------------+-----------+---------------+---------------+--------+---------------+----------------------+
|    bundleId     | cpuCount  | diskSizeInGb  | instanceType  | price  |  ramSizeInGb  | supportedPlatforms   |
+-----------------+-----------+---------------+---------------+--------+---------------+----------------------+
|  nano_2_0       |  1        |  20           |  nano         |  3.5   |  0.5          |  LINUX_UNIX          |
|  micro_2_0      |  1        |  40           |  micro        |  5.0   |  1.0          |  LINUX_UNIX          |
|  small_2_0      |  1        |  60           |  small        |  10.0  |  2.0          |  LINUX_UNIX          |
|  medium_2_0     |  2        |  80           |  medium       |  20.0  |  4.0          |  LINUX_UNIX          |
|  large_2_0      |  2        |  160          |  large        |  40.0  |  8.0          |  LINUX_UNIX          |
|  xlarge_2_0     |  4        |  320          |  xlarge       |  80.0  |  16.0         |  LINUX_UNIX          |
|  2xlarge_2_0    |  8        |  640          |  2xlarge      |  160.0 |  32.0         |  LINUX_UNIX          |
|  nano_win_2_0   |  1        |  30           |  nano         |  8.0   |  0.5          |  WINDOWS             |
|  micro_win_2_0  |  1        |  40           |  micro        |  12.0  |  1.0          |  WINDOWS             |
|  small_win_2_0  |  1        |  60           |  small        |  20.0  |  2.0          |  WINDOWS             |
|  medium_win_2_0 |  2        |  80           |  medium       |  40.0  |  4.0          |  WINDOWS             |
|  large_win_2_0  |  2        |  160          |  large        |  70.0  |  8.0          |  WINDOWS             |
|  xlarge_win_2_0 |  4        |  320          |  xlarge       |  120.0 |  16.0         |  WINDOWS             |
|  2xlarge_win_2_0|  8        |  640          |  2xlarge      |  240.0 |  32.0         |  WINDOWS             |
+-----------------+-----------+---------------+---------------+--------+---------------+----------------------+

< ~/kis9a !+master > aws --profile=kis9a lightsail get-bundles --region ap-northeast-1 --query 'bundles[].{price:price,cpuCount:cpuCount,ramSizeInGb:ramSizeInGb,diskSizeInGb:diskSizeInGb,bundleId:bundleId,instanceType:instanceType,supportedPlatforms:supportedPlatforms[0]}' --output table

---------------------------------------------------------------------------------------------------------------
|                                                 GetBundles                                                  |
+-----------------+-----------+---------------+---------------+--------+---------------+----------------------+
|    bundleId     | cpuCount  | diskSizeInGb  | instanceType  | price  |  ramSizeInGb  | supportedPlatforms   |
+-----------------+-----------+---------------+---------------+--------+---------------+----------------------+
|  nano_2_0       |  1        |  20           |  nano         |  3.5   |  0.5          |  LINUX_UNIX          |
|  micro_2_0      |  1        |  40           |  micro        |  5.0   |  1.0          |  LINUX_UNIX          |
|  small_2_0      |  1        |  60           |  small        |  10.0  |  2.0          |  LINUX_UNIX          |
|  medium_2_0     |  2        |  80           |  medium       |  20.0  |  4.0          |  LINUX_UNIX          |
|  large_2_0      |  2        |  160          |  large        |  40.0  |  8.0          |  LINUX_UNIX          |
|  xlarge_2_0     |  4        |  320          |  xlarge       |  80.0  |  16.0         |  LINUX_UNIX          |
|  2xlarge_2_0    |  8        |  640          |  2xlarge      |  160.0 |  32.0         |  LINUX_UNIX          |
|  nano_win_2_0   |  1        |  30           |  nano         |  8.0   |  0.5          |  WINDOWS             |
|  micro_win_2_0  |  1        |  40           |  micro        |  12.0  |  1.0          |  WINDOWS             |
|  small_win_2_0  |  1        |  60           |  small        |  20.0  |  2.0          |  WINDOWS             |
|  medium_win_2_0 |  2        |  80           |  medium       |  40.0  |  4.0          |  WINDOWS             |
|  large_win_2_0  |  2        |  160          |  large        |  70.0  |  8.0          |  WINDOWS             |
|  xlarge_win_2_0 |  4        |  320          |  xlarge       |  120.0 |  16.0         |  WINDOWS             |
|  2xlarge_win_2_0|  8        |  640          |  2xlarge      |  240.0 |  32.0         |  WINDOWS             |
+-----------------+-----------+---------------+---------------+--------+---------------+----------------------+


lightsail -h
o allocate-static-ip
o attach-certificate-to-distribution
o attach-disk
o attach-instances-to-load-balancer
o attach-load-balancer-tls-certificate
o attach-static-ip
o close-instance-public-ports
o copy-snapshot
o create-certificate
o create-cloud-formation-stack
o create-contact-method
o create-container-service
o create-container-service-deployment
o create-container-service-registry-login
o create-disk
o create-disk-from-snapshot
o create-disk-snapshot
o create-distribution
o create-domain
o create-domain-entry
o create-instance-snapshot
o create-instances
o create-instances-from-snapshot
o create-key-pair
o create-load-balancer
o create-load-balancer-tls-certificate
o create-relational-database
o create-relational-database-from-snapshot
o create-relational-database-snapshot
o delete-alarm
o delete-auto-snapshot
o delete-certificate
o delete-contact-method
o delete-container-image
o delete-container-service
o delete-disk
o delete-disk-snapshot
o delete-distribution
o delete-domain
o delete-domain-entry
o delete-instance
o delete-instance-snapshot
o delete-key-pair
o delete-known-host-keys
o delete-load-balancer
o delete-load-balancer-tls-certificate
o delete-relational-database
o delete-relational-database-snapshot
o detach-certificate-from-distribution
o detach-disk
o detach-instances-from-load-balancer
o detach-static-ip
o disable-add-on
o download-default-key-pair
o enable-add-on
o export-snapshot
o get-active-names
o get-alarms
o get-auto-snapshots
o get-blueprints
o get-bundles
o get-certificates
o get-cloud-formation-stack-records
o get-contact-methods
o get-container-api-metadata
o get-container-images
o get-container-log
o get-container-service-deployments
o get-container-service-metric-data
o get-container-service-powers
o get-container-services
o get-disk
o get-disk-snapshot
o get-disk-snapshots
o get-disks
o get-distribution-bundles
o get-distribution-latest-cache-reset
o get-distribution-metric-data
o get-distributions
o get-domain
o get-domains
o get-export-snapshot-records
o get-instance
o get-instance-access-details
o get-instance-metric-data
o get-instance-port-states
o get-instance-snapshot
o get-instance-snapshots
o get-instance-state
o get-instances
o get-key-pair
o get-key-pairs
o get-load-balancer
o get-load-balancer-metric-data
o get-load-balancer-tls-certificates
o get-load-balancers
o get-operation
o get-operations
o get-operations-for-resource
o get-regions
o get-relational-database
o get-relational-database-blueprints
o get-relational-database-bundles
o get-relational-database-events
o get-relational-database-log-events
o get-relational-database-log-streams
o get-relational-database-master-user-password
o get-relational-database-metric-data
o get-relational-database-parameters
o get-relational-database-snapshot
o get-relational-database-snapshots
o get-relational-databases
o get-static-ip
o get-static-ips
o help
o import-key-pair
o is-vpc-peered
o open-instance-public-ports
o peer-vpc
o push-container-image
o put-alarm
o put-instance-public-ports
o reboot-instance
o reboot-relational-database
o register-container-image
o release-static-ip
o reset-distribution-cache
o send-contact-method-verification
o set-ip-address-type
o start-instance
o start-relational-database
o stop-instance
o stop-relational-database
o tag-resource
o test-alarm
o unpeer-vpc
o untag-resource
o update-container-service
o update-distribution
o update-distribution-bundle
o update-domain-entry
o update-load-balancer-attribute
o update-relational-database
o update-relational-database-parameters                                                                   LIGHTSAIL()

< ~/dev/ltf master > aws --profile=kis9a lightsail get-blueprints --query 'blueprints[?type==`os`&&platform==`LINUX_UNIX`].{name:name,version:version}' --output table
--------------------------------------------
|               GetBlueprints              |
+-----------------+------------------------+
|      name       |        version         |
+-----------------+------------------------+
|  Amazon Linux 2 |  2.0.20210427.0        |
|  Amazon Linux   |  2018.03.0.20210408.0  |
|  Ubuntu         |  20.04 LTS             |
|  Ubuntu         |  18.04 LTS             |
|  Ubuntu         |  16.04 LTS             |
|  Debian         |  10.8                  |
|  Debian         |  9.13                  |
|  Debian         |  8.7                   |
|  FreeBSD        |  12.2                  |
|  openSUSE       |  15.2                  |
|  CentOS         |  8 2004-01             |
|  CentOS         |  7 2009-01             |
+-----------------+------------------------+

< ~/kis9a !+master > aws --profile=kis9a lightsail get-blueprints --region eu-west-1 --query 'blueprints[].{blueprintId:blueprintId,name:name,group:group,productUrl:productUrl,platform:platform}' --output table
---------------------------------------------------------------------------------------------------------------
|  GetBlueprints                                                                                              |
+--------------------------------------+-----------------------+--------------------------------+-------------+
|              blueprintId             |         group         |             name               |  platform   |
+--------------------------------------+-----------------------+--------------------------------+-------------+
|  windows_server_2019                 |  windows_2019         |  Windows Server 2019           |  WINDOWS    |
|  windows_server_2016                 |  windows_2016         |  Windows Server 2016           |  WINDOWS    |
|  windows_server_2012                 |  windows_2012         |  Windows Server 2012 R2        |  WINDOWS    |
|  windows_server_2016_sql_2016_express|  windows_2016_sql_exp |  SQL Server 2016 Express       |  WINDOWS    |
|  amazon_linux_2                      |  amazon_linux_2       |  Amazon Linux 2                |  LINUX_UNIX |
|  amazon_linux                        |  amazon-linux         |  Amazon Linux                  |  LINUX_UNIX |
|  ubuntu_20_04                        |  ubuntu_20            |  Ubuntu                        |  LINUX_UNIX |
|  ubuntu_18_04                        |  ubuntu_18            |  Ubuntu                        |  LINUX_UNIX |
|  ubuntu_16_04_2                      |  ubuntu               |  Ubuntu                        |  LINUX_UNIX |
|  debian_10                           |  debian_10            |  Debian                        |  LINUX_UNIX |
|  debian_9_13                         |  debian_9             |  Debian                        |  LINUX_UNIX |
|  debian_8_7                          |  debian               |  Debian                        |  LINUX_UNIX |
|  freebsd_12                          |  freebsd              |  FreeBSD                       |  LINUX_UNIX |
|  opensuse_15_2                       |  opensuse             |  openSUSE                      |  LINUX_UNIX |
|  centos_8                            |  centos_8             |  CentOS                        |  LINUX_UNIX |
|  centos_7_2009_01                    |  centos               |  CentOS                        |  LINUX_UNIX |
|  wordpress                           |  wordpress            |  WordPress                     |  LINUX_UNIX |
|  wordpress_multisite                 |  wordpress_multisite  |  WordPress Multisite           |  LINUX_UNIX |
|  lamp_7                              |  lamp_7               |  LAMP (PHP 7)                  |  LINUX_UNIX |
|  nodejs                              |  node                 |  Node.js                       |  LINUX_UNIX |
|  joomla                              |  joomla               |  Joomla                        |  LINUX_UNIX |
|  magento                             |  magento              |  Magento                       |  LINUX_UNIX |
|  mean                                |  mean                 |  MEAN                          |  LINUX_UNIX |
|  drupal                              |  drupal               |  Drupal                        |  LINUX_UNIX |
|  gitlab                              |  gitlab               |  GitLab CE                     |  LINUX_UNIX |
|  redmine                             |  redmine              |  Redmine                       |  LINUX_UNIX |
|  nginx                               |  nginx                |  Nginx                         |  LINUX_UNIX |
|  ghost_bitnami                       |  ghost_bitnami        |  Ghost                         |  LINUX_UNIX |
|  django_bitnami                      |  django_bitnami       |  Django                        |  LINUX_UNIX |
|  prestashop_bitnami                  |  prestashop_bitnami   |  PrestaShop                    |  LINUX_UNIX |
|  plesk_ubuntu_18_0_34                |  plesk_ubuntu         |  Plesk Hosting Stack on Ubuntu |  LINUX_UNIX |
|  cpanel_whm_linux                    |  cpanel_whm_linux     |  cPanel & WHM for Linux        |  LINUX_UNIX |
+--------------------------------------+-----------------------+--------------------------------+-------------+

