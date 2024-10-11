---
date: "2022-10-24"
sections:
- block: about.avatar
  content:
    text: null
    username: admin
  id: about
- block: collection
  content:
    filters:
      exclude_featured: true
      folders:
      - publication
    #text: |-
      #{{% callout note %}}
      #Quickly discover relevant content by [filtering publications](./publication/).
      #{{% /callout %}}
    title: Journal Articles
  design:
    columns: "2"
    view: compact
  id: publication
- block: collection
  content:
    count: 5
    filters:
      author: ""
      category: ""
      exclude_featured: false
      exclude_future: false
      exclude_past: false
      folders:
      - post
      publication_type: ""
      tag: ""
    offset: 0
    order: desc
    subtitle: ""
    text: ""
    title: Recent Posts
  design:
    columns: "2"
    view: compact
  id: posts
- block: contact
  content:
    address:
      city: Maputo
      country: Mozambique
      country_code: MZ
      postcode: "3453"
      region: CA
      street: Av. Julius Nyerere/Campus 3453
    appointment_url: https://calendly.com
    #autolink: true
    #contact_links:
    #- icon: twitter
     # icon_pack: fab
      #link: https://twitter.com/Twitter
      #name: DM Me
    #- icon: skype
    #  icon_pack: fab
    #  link: skype:echo123?call
    #  name: Skype Me
   # - icon: video
   #   icon_pack: fas
   #   link: https://zoom.com
    #  name: Zoom Me
   # directions: Enter Building 1 and take the stairs to Office 200 on Floor 2
    email: rmuleia@gmail.com
    form:
      formspree:
        id: null
      netlify:
        captcha: false
      provider: netlify
    office_hours:
    - Tuesday 10:00 to 17:00
    - Thursday 10:00 to 17:00
    #phone: 888 888 88 88
    subtitle: null
    #text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi diam, venenatis
     # ut magna et, vehicula efficitur enim.
    title: Contact
  design:
    columns: "2"
  id: contact
title: null
type: landing
---
