Write-Output "Executing PowerShell Script..."

Write-Output "Installing PnP module..."
Install-Module -Name PnP.PowerShell -Force -Scope "CurrentUser"

Write-Output "Connect PnP Online..."
Connect-PnPOnline -Url $Env:DEVSITEURL -ClientId $Env:APPID -CertificateBase64Encoded $Env:BASEENCODEDSTRING -CertificatePassword (ConvertTo-SecureString -AsPlainText $Env:CERTPWD -Force) -Tenant $Env:TENANT
Write-Output "Connect PnP Successful"

#Add-PnPApp -Scope Site -Publish -Overwrite -Path "$(System.DefaultWorkingDirectory)/$(Release.PrimaryArtifactSourceAlias)/drop/sharepoint/solution/spfx-demo.sppkg"