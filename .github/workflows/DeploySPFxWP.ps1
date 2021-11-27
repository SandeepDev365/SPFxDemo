Write-Output "Executing PowerShell Script..."

$test = $Env:DEVSITEURL
Write-Output "Test secret - $test"

#Install-Module -Name PnP.PowerShell -Force -Scope "CurrentUser"

#Connect-PnPOnline -Url $(devSiteUrl) -ClientId $(appid) -CertificateBase64Encoded $(baseencodedstring) -CertificatePassword (ConvertTo-SecureString -AsPlainText $(certpwd) -Force) -Tenant $(tenant)

#Add-PnPApp -Scope Site -Publish -Overwrite -Path "$(System.DefaultWorkingDirectory)/$(Release.PrimaryArtifactSourceAlias)/drop/sharepoint/solution/spfx-demo.sppkg"