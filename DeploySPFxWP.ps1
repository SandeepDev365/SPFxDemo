﻿Write-Output "Executing PowerShell Script..."

#$devSiteUrl = "https://sandyunnikrish.sharepoint.com/sites/MyCommunicationSite/"
#$clientId = "f6cd7468-13e0-42da-b7e0-e2b2e96cdd36"
$devSiteUrl = $DEVSITEURL
$clientId = $APPID
$baseEncodedString = "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"
$cerPwd = "test@123"
$tenant = "sandyunnikrish.onmicrosoft.com"
$packagePath = $Env:packagePath

Write-Host "Package Path " $packagePath

Write-Output "Installing PnP module..."
Install-Module -Name PnP.PowerShell -Force -Scope "CurrentUser"

Write-Output "Connect PnP Online..."
Connect-PnPOnline -Url $devSiteUrl -ClientId $clientId -CertificateBase64Encoded $baseEncodedString -CertificatePassword (ConvertTo-SecureString -AsPlainText $cerPwd -Force) -Tenant $tenant
Write-Output "Connect PnP Successful"

Add-PnPApp -Scope Site -Publish -Overwrite -Path $packagePath